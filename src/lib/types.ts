export type Categories = string

export type Post = {
    title: string
    slug: string
    description: string
    date: string
    /** Optional. When a post is revised, set this so `dateModified` and the
     *  sitemap's `lastmod` reflect the revision rather than first publication. */
    updated?: string
    location: string
    categories: Categories[]
    published: boolean
    img?: string
    language?: string[]
    /** Optional. Slugs of this post in other locales, keyed by locale code —
     *  used to emit a real hreflang group for genuinely translated posts. */
    translations?: Record<string, string>
    readingTime?: number
    viewCount?: number
    commentCount?: number
}

