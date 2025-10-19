import { db } from "@/server/db";
import { publicProcedure, router } from "../trpc";
import { posts } from "@/server/db/schema";
import z from "zod";

export const postRouter = router({
    getAll: publicProcedure.query(async ()=> {
        return await db.select().from(posts);
    }),
    create: publicProcedure.input(z.object({
        title: z.string().min(1),
        content: z.string(),
        slug: z.string(),
    })).mutation(async ({input})=> {
        return await db.insert(posts).values(input).returning();
    }),
});