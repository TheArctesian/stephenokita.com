type DateStyle = Intl.DateTimeFormatOptions['dateStyle']

export function formatDate(date: string, dateStyle: DateStyle = 'medium', locales = 'en') {
	// Safari is mad about dashes in the date
	const dateToFormat = new Date(date.replaceAll('-', '/'))
	const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle })
	return dateFormatter.format(dateToFormat)
}

export function calculateReadingTime(text: string): number {
	// Average reading speed is 200-250 words per minute
	// We'll use 180 for a more conservative estimate (longer reading times)
	const wordsPerMinute = 180
	
	// Remove code blocks and HTML tags for more accurate count
	const cleanText = text
		.replace(/```[\s\S]*?```/g, '') // Remove code blocks
		.replace(/<[^>]*>/g, '') // Remove HTML tags
		.replace(/\s+/g, ' ') // Normalize whitespace
		.trim()
	
	// Count words
	const wordCount = cleanText.split(/\s+/).filter(word => word.length > 0).length
	
	// Calculate reading time in minutes, minimum 1 minute
	const readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute))
	
	return readingTime
}
