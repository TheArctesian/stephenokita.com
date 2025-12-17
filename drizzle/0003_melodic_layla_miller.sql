CREATE TABLE "blog_analytics" (
	"id" serial PRIMARY KEY NOT NULL,
	"post_slug" text NOT NULL,
	"view_count" integer DEFAULT 0 NOT NULL,
	"unique_visitors" integer DEFAULT 0 NOT NULL,
	"last_viewed" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "blog_analytics_post_slug_unique" UNIQUE("post_slug")
);
--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "author_email" DROP NOT NULL;