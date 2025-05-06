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
        // Fetch the Instagram page
        const response = await fetch(instagramUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Cache-Control': 'max-age=0',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Sec-Fetch-User': '?1',
                'Upgrade-Insecure-Requests': '1'
            }
        });

        if (!response.ok) {
            // If we can't fetch directly, use fallback
            return generateFallbackResponse(postId);
        }

        const html = await response.text();

        // Log a small snippet to debug
        console.log(`Received HTML response (first 200 chars): ${html.substring(0, 200)}`);

        const result: ImageResponse = { imageUrl: '' };

        // First check if we got a login page instead of content
        if (html.includes('login') && html.includes('regForm')) {
            console.log('Instagram returned a login page');
            return generateFallbackResponse(postId);
        }

        // Method 1: Look for og:image meta tag
        let imgMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i);
        if (imgMatch && imgMatch[1]) {
            result.imageUrl = imgMatch[1];

            // Try to get image dimensions from meta tags
            const widthMatch = html.match(/<meta\s+property="og:image:width"\s+content="([^"]+)"/i);
            const heightMatch = html.match(/<meta\s+property="og:image:height"\s+content="([^"]+)"/i);

            if (widthMatch && widthMatch[1] && heightMatch && heightMatch[1]) {
                result.width = parseInt(widthMatch[1], 10);
                result.height = parseInt(heightMatch[1], 10);
            }

            return json(result);
        }

        // Method 2: Look for content in JSON-LD scripts
        const scriptTags = html.match(/<script\s+type="application\/ld\+json">([^<]+)<\/script>/g);
        if (scriptTags) {
            for (const scriptTag of scriptTags) {
                const contentMatch = scriptTag.match(/<script\s+type="application\/ld\+json">([^<]+)<\/script>/);
                if (contentMatch && contentMatch[1]) {
                    try {
                        const jsonLd = JSON.parse(contentMatch[1]);
                        if (jsonLd.image) {
                            result.imageUrl = typeof jsonLd.image === 'string'
                                ? jsonLd.image
                                : jsonLd.image.url || (Array.isArray(jsonLd.image) ? jsonLd.image[0] : null);

                            if (result.imageUrl) {
                                // Try to extract dimensions if available
                                if (typeof jsonLd.image !== 'string' && jsonLd.image.width && jsonLd.image.height) {
                                    result.width = jsonLd.image.width;
                                    result.height = jsonLd.image.height;
                                }

                                return json(result);
                            }
                        }
                    } catch (e) {
                        console.error('Failed to parse JSON-LD', e);
                    }
                }
            }
        }

        // Method 3: Look for image URL in various JavaScript data objects
        const dataPatterns = [
            /window\._sharedData\s*=\s*({.+?});/,
            /window\.__additionalDataLoaded\(['"].*?['"]\s*,\s*({.+?})\);/,
            /"display_url":"([^"]+)"/
        ];

        for (const pattern of dataPatterns) {
            const match = html.match(pattern);
            if (match) {
                if (pattern.toString().includes('display_url')) {
                    // Direct pattern match for display_url
                    result.imageUrl = match[1].replace(/\\u0026/g, '&').replace(/\\/g, '');
                    return json(result);
                } else {
                    // Parse JSON data object
                    try {
                        const data = JSON.parse(match[1]);

                        // Try to find the image URL in various paths
                        let mediaData = null;

                        // Path 1: From shared data
                        if (data.entry_data?.PostPage?.[0]?.graphql?.shortcode_media) {
                            mediaData = data.entry_data.PostPage[0].graphql.shortcode_media;
                        }
                        // Path 2: From additional data
                        else if (data.graphql?.shortcode_media) {
                            mediaData = data.graphql.shortcode_media;
                        }
                        // Path 3: From items
                        else if (data.items?.[0]) {
                            mediaData = data.items[0];
                        }

                        if (mediaData) {
                            // Extract display URL
                            if (mediaData.display_url) {
                                result.imageUrl = mediaData.display_url;

                                // Get dimensions
                                if (mediaData.dimensions) {
                                    result.width = mediaData.dimensions.width;
                                    result.height = mediaData.dimensions.height;
                                }

                                return json(result);
                            }
                            // For carousel posts
                            else if (mediaData.carousel_media && mediaData.carousel_media.length > 0) {
                                const firstItem = mediaData.carousel_media[0];
                                if (firstItem.display_url) {
                                    result.imageUrl = firstItem.display_url;

                                    if (firstItem.dimensions) {
                                        result.width = firstItem.dimensions.width;
                                        result.height = firstItem.dimensions.height;
                                    }

                                    return json(result);
                                }
                            }
                        }
                    } catch (e) {
                        console.error('Failed to parse data object:', e);
                    }
                }
            }
        }

        // Method 4: Find any image in the page that looks like an Instagram image
        const imgRegex = /<img[^>]+src="([^"]+(?:cdninstagram\.com|fbcdn\.net)[^"]+)"[^>]*>/g;
        let imgMatches;
        let largestImg = { url: '', width: 0, height: 0 };

        while ((imgMatches = imgRegex.exec(html)) !== null) {
            const src = imgMatches[1];
            const widthMatch = imgMatches[0].match(/width="(\d+)"/);
            const heightMatch = imgMatches[0].match(/height="(\d+)"/);

            const width = widthMatch ? parseInt(widthMatch[1], 10) : 0;
            const height = heightMatch ? parseInt(heightMatch[1], 10) : 0;

            // Keep track of the largest image
            if (width * height > largestImg.width * largestImg.height) {
                largestImg = { url: src, width, height };
            }
        }

        if (largestImg.url) {
            result.imageUrl = largestImg.url;
            if (largestImg.width && largestImg.height) {
                result.width = largestImg.width;
                result.height = largestImg.height;
            }
            return json(result);
        }

        // If we still can't find an image, use our fallback method
        return generateFallbackResponse(postId);
    } catch (err) {
        console.error('Instagram image extraction error:', err);

        // Use fallback in case of any error
        return generateFallbackResponse(postId);
    }
};

// Fallback function that generates a response with a predicted CDN URL
function generateFallbackResponse(postId: string): Response {
    // Try to construct a URL that might work based on common Instagram CDN patterns
    const cdnUrl = `https://scontent.cdninstagram.com/v/${postId}.jpg`;

    return json({
        imageUrl: cdnUrl,
        width: 1080,  // Standard Instagram image width
        height: 1080, // Assuming square for fallback
        isFallback: true
    });
}