import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

interface ImageResponse {
    imageUrl: string;
    width?: number;
    height?: number;
}

export const GET: RequestHandler = async ({ url, fetch }) => {
    const instagramUrl = url.searchParams.get('url');

    if (!instagramUrl || !instagramUrl.includes('instagram.com/p/')) {
        throw error(400, 'Invalid Instagram URL');
    }

    // Extract post ID for fallback methods
    const postId = instagramUrl.match(/\/p\/([^\/\?]+)/)?.[1];
    if (!postId) {
        throw error(400, 'Invalid Instagram post URL format');
    }

    try {
        // Quick attempt to fetch with minimal headers
        const response = await fetch(instagramUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; InstagramBot/1.0)',
                'Accept': 'text/html,application/xhtml+xml',
                'Accept-Language': 'en-US,en;q=0.5'
            },
            // Add timeout to fail fast
            signal: AbortSignal.timeout(5000)
        });

        if (!response.ok) {
            console.log('Instagram returned non-OK response, using iframe fallback');
            return generateFallbackResponse(postId);
        }

        const html = await response.text();

        // Quick check if we got a login page instead of content
        if (html.includes('login') || html.length < 1000) {
            console.log('Instagram returned login page or minimal content, using iframe fallback');
            return generateFallbackResponse(postId);
        }

        const result: ImageResponse = { imageUrl: '' };

        // Try to extract og:image meta tag (most reliable method)
        const ogImageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
        if (ogImageMatch && ogImageMatch[1]) {
            const imageUrl = ogImageMatch[1];
            
            // Validate that it's actually an Instagram image URL
            if (imageUrl.includes('cdninstagram.com') || imageUrl.includes('fbcdn.net')) {
                result.imageUrl = imageUrl;
                
                // Try to get dimensions
                const widthMatch = html.match(/<meta\s+property="og:image:width"\s+content="([^"]+)"/i);
                const heightMatch = html.match(/<meta\s+property="og:image:height"\s+content="([^"]+)"/i);
                
                if (widthMatch && heightMatch) {
                    result.width = parseInt(widthMatch[1], 10);
                    result.height = parseInt(heightMatch[1], 10);
                }
                
                console.log('Successfully extracted image URL via og:image');
                return json(result);
            }
        }

        // If og:image didn't work, fall back to iframe
        console.log('Could not extract direct image URL, using iframe fallback');
        return generateFallbackResponse(postId);
        
    } catch (err) {
        console.log('Instagram scraping failed:', err.message);
        return generateFallbackResponse(postId);
    }
};

// Fallback function that signals to use iframe embed
function generateFallbackResponse(postId: string): Response {
    return json({
        imageUrl: null,
        width: null,
        height: null,
        isFallback: true,
        useIframe: true,
        postId: postId
    });
}