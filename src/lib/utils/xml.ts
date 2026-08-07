/**
 * Unix Philosophy: Do one thing well — escape text for XML character data.
 * Shared by the RSS feed and the sitemap so both stay correct for the post
 * titles that contain apostrophes and ampersands.
 */
export function escapeXml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;')
}
