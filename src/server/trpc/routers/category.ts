import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { db } from '@/server/db';
import { categories } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export const categoryRouter = router({
  getAll: publicProcedure.query(async () => {
    return await db.select().from(categories);
  }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const result = await db.select().from(categories).where(eq(categories.id, input.id));
      return result[0] || null;
    }),
  create: publicProcedure
    .input(z.object({
      name: z.string().min(1, "Name is required"),
      description: z.string().optional(),
      slug: z.string().min(1, "Slug is required"),
    }))
    .mutation(async ({ input }) => {
      const result = await db.insert(categories).values(input).returning();
      return result[0];
    }),
  update: publicProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().min(1).optional(),
      description: z.string().optional(),
      slug: z.string().min(1).optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const result = await db.update(categories)
        .set(data)
        .where(eq(categories.id, id))
        .returning();
      return result[0];
    }),
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.delete(categories).where(eq(categories.id, input.id));
      return { success: true };
    }),
});