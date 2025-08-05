import { pgTable, serial, integer, text, timestamp, boolean, json } from 'drizzle-orm/pg-core';

// Skills tables
export const skillCategories = pgTable('skill_categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  color: text('color').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  categoryId: integer('category_id').references(() => skillCategories.id),
  level: text('level'), // beginner, intermediate, advanced, expert
  description: text('description'),
  icon: text('icon'),
  url: text('url'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Projects tables
export const projectCategories = pgTable('project_categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  longDescription: text('long_description'),
  categoryId: integer('category_id').references(() => projectCategories.id),
  technologies: json('technologies').$type<string[]>(),
  githubUrl: text('github_url'),
  liveUrl: text('live_url'),
  imageUrl: text('image_url'),
  status: text('status'), // active, completed, archived, in-progress
  featured: boolean('featured').default(false),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Personal content tables
export const quotes = pgTable('quotes', {
  id: serial('id').primaryKey(),
  text: text('text').notNull(),
  author: text('author'),
  source: text('source'),
  category: text('category'),
  language: text('language').default('en'),
  favorite: boolean('favorite').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const poems = pgTable('poems', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  author: text('author'),
  language: text('language').default('en'),
  category: text('category'),
  favorite: boolean('favorite').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const music = pgTable('music', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  artist: text('artist').notNull(),
  album: text('album'),
  genre: text('genre'),
  year: text('year'),
  spotifyUrl: text('spotify_url'),
  youtubeUrl: text('youtube_url'),
  favorite: boolean('favorite').default(false),
  currentlyListening: boolean('currently_listening').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Instruments and languages
export const instruments = pgTable('instruments', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  level: text('level'), // beginner, intermediate, advanced, expert
  yearsPlaying: text('years_playing'),
  favorite: boolean('favorite').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const languages = pgTable('languages', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  nativeName: text('native_name'),
  level: text('level'), // native, fluent, conversational, basic
  flag: text('flag'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Blog-related tables (for unfinished content tracking)
export const blogDrafts = pgTable('blog_drafts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content'),
  category: text('category'), // projects or writing
  tags: json('tags').$type<string[]>(),
  status: text('status').default('draft'), // draft, in-progress, abandoned
  lastWorkedOn: timestamp('last_worked_on').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Latin phrases table
export const latinPhrases = pgTable('latin_phrases', {
  id: serial('id').primaryKey(),
  phrase: text('phrase').notNull(),
  translation: text('translation').notNull(),
  context: text('context'),
  category: text('category'),
  favorite: boolean('favorite').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// Animation/visual content
export const animations = pgTable('animations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  type: text('type'), // css, js, svg, etc.
  code: text('code'),
  previewUrl: text('preview_url'),
  featured: boolean('featured').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

// User authentication tables
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  hashedPassword: text('hashed_password').notNull(),
  name: text('name').notNull(),
  isVerified: boolean('is_verified').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: integer('user_id').references(() => users.id).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow()
});

// Comments system
export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  postSlug: text('post_slug').notNull(), // References blog post slug
  userId: integer('user_id').references(() => users.id),
  authorName: text('author_name').notNull(), // For display
  authorEmail: text('author_email').notNull(), // For gravatar/replies
  content: text('content').notNull(),
  parentId: integer('parent_id').references(() => comments.id), // For nested replies
  isApproved: boolean('is_approved').default(false), // Moderation
  isDeleted: boolean('is_deleted').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});