import z from "zod";
import { publicProcedure, router } from "../trpc";
import { categories, postCategories, posts } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";

export const postCategoryRouter = router({
    assignCategories: publicProcedure.input(z.object({
        postId: z.number(),
        categoryIds: z.array(z.number()),
    })).mutation(async ({input})=> {
        await db.delete(postCategories).where(eq(postCategories.postId, input.postId));
        if(input.categoryIds.length > 0){
            const values = input.categoryIds.map(categoryId=> ({
                postId: input.postId,
                categoryId,
            }));
            await db.insert(postCategories).values(values); // update the values with new array
        }
        return { success: true};
    }),
    getPostCategories: publicProcedure.input(z.object({postId: z.number()})).query(async ({input})=> {
        const result = await db.select({category: categories}).from(postCategories).innerJoin(categories, eq(postCategories.id, categories.id)).where(eq(postCategories.postId, input.postId));
        return result.map(r=> r.category);
    }),
    getPostsByCategory: publicProcedure.input(z.object({categoryId: z.number()})).query(async ({input})=> {
        const result = await db.select({post: posts}).from(postCategories).innerJoin(posts, eq(postCategories.postId, posts.id)).where(eq(postCategories.categoryId, input.categoryId));
        return result.map(r=> r.post);
    }),
});