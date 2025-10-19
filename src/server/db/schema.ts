import { pgTable, serial, text, boolean, timestamp } from 'drizzle-orm/pg-core';

// table for blog posts
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  slug: text('slug').notNull().unique(),
  published: boolean('published').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// table for categories
export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  slug: text('slug').notNull().unique(),
});

// table for categories associated with posts
export const postCategories = pgTable('post_categories', {
  id: serial('id').primaryKey(),
  postId: serial('post_id').references(() => posts.id), // foreign key
  categoryId: serial('category_id').references(() => categories.id), // foreign key
});