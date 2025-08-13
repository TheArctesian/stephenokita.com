import type { Post } from "$lib/types";

async function getPosts() {
  let posts: Post[] = [];

  const paths = import.meta.glob("/src/routes/blog/posts/*.md", {
    eager: true,
  });

  for (const path in paths) {
    const file = paths[path];
    const slug = path.split("/").at(-1)?.replace(".md", "");

    if (file && typeof file === "object" && "metadata" in file && slug) {
      const metadata = file.metadata as Omit<Post, "slug">;
      const post = { ...metadata, slug } satisfies Post;
      post.published && posts.push(post);
    }
  }

  posts = posts.sort(
    (first, second) =>
      new Date(second.date).getTime() - new Date(first.date).getTime(),
  );

  return posts;
}

const siteURL = "https://stephenokita.com";
const siteTitle = "Stephen Daniel Okita's Blog";
const siteDescription =
  "Thoughts on philosophy, technology, and life from Stephen Daniel Okita";

export async function GET() {
  const posts = await getPosts();

  const body = render(posts);
  const options = {
    headers: {
      "Cache-Control": "max-age=0, s-maxage=3600",
      "Content-Type": "application/xml",
    },
  };
  return new Response(body, options);
}

const render = (posts: Post[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${siteTitle}</title>
<description>${siteDescription}</description>
<link>${siteURL}</link>
<atom:link href="${siteURL}/rss.xml" rel="self" type="application/rss+xml"/>
<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
<language>en-US</language>
<generator>SvelteKit</generator>
${posts
    .map(
      (post) => `<item>
<guid isPermaLink="true">${siteURL}/${post.slug}</guid>
<title>${post.title}</title>
<link>${siteURL}/${post.slug}</link>
<description>${post.description}</description>
<pubDate>${new Date(post.date).toUTCString()}</pubDate>
${post.categories?.map((category) => `<category>${category}</category>`).join("\n") || ""}
</item>`,
    )
    .join("")}
</channel>
</rss>`;
