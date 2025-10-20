import {router} from './trpc';
import { postRouter } from './routers/post';
import { categoryRouter } from './routers/category';
import { postCategoryRouter } from './routers/postCategory';

export const appRouter = router({
    post: postRouter,
    category: categoryRouter,
    postCategory: postCategoryRouter
});

export type AppRouter = typeof appRouter;