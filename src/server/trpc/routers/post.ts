import { db } from "@/server/db";
import { publicProcedure, router } from "../trpc";
import { categories, postCategories, posts } from "@/server/db/schema";
import z from "zod";
import { eq } from "drizzle-orm";

export const postRouter = router({
    getAll: publicProcedure.query(async () => {
        return await db.query.posts.findMany();
    }),
    getAllWithCategories: publicProcedure.query(async ()=> {
        const allPosts = await db.select().from(posts);
        const postsWCategories = await Promise.all(
            allPosts.map(async(post)=> {
                const cat = await db.select({category: categories}).from(postCategories).innerJoin(categories, eq(postCategories.categoryId, categories.id)).where(eq(postCategories.postId, post.id));
                
                return {
                    ...post,
                    categories: cat.map(c=> c.category)
                };
            })
        );
        return postsWCategories;
    }),
    getBySlug: publicProcedure.input(z.object({ slug: z.string() }))
        .query(async ({ input }) => {
            const result = await db.select().from(posts).where(eq(posts.slug, input.slug));
            return result[0] || null;
        }),
    getById: publicProcedure.input(z.object({ id: z.number() }))
        .query(async ({ input }) => {
            const result = await db.select().from(posts).where(eq(posts.id, input.id));
            return result[0] || null;
        }),
    create: publicProcedure
        .input(z.object({
            title: z.string().min(1, "Title is required"),
            content: z.string().min(1, "Content is required"),
            slug: z.string().min(1, "Slug is required"),
            published: z.boolean().default(false),
        }))
        .mutation(async ({ input }) => {
            const result = await db.insert(posts).values({
                ...input,
                createdAt: new Date(),
                updatedAt: new Date(),
            }).returning();
            return result[0];
        }),
    update: publicProcedure.input(z.object({
        id: z.number(), // expect id all will be optional for updating blog post
        title: z.string().min(1).optional(),
        content: z.string().min(1).optional(),
        slug: z.string().min(1).optional(),
        published: z.boolean().optional(),
    })).mutation(async ({ input }) => {
        const { id, ...data } = input;
        const result = await db.update(posts).set({ ...data, updatedAt: new Date() }).where(eq(posts.id, id)).returning();
        return result[0];
    }),
    delete: publicProcedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
        await db.delete(posts).where(eq(posts.id, input.id));
        return { success: true };
    }),
});