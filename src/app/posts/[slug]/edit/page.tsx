import { db } from '@/server/db';
import { posts, postCategories } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import EditPost from '@/components/EditPost';

export default async function EditPostPage({ params }: { params: { slug: string } }) {
    const post = await db.select().from(posts).where(eq(posts.slug, params.slug)).then(r => r[0]);

    if (!post) notFound();

    // Get assigned categories
    const assignedCategories = await db
        .select({ categoryId: postCategories.categoryId })
        .from(postCategories)
        .where(eq(postCategories.postId, post.id));

    return (
        <EditPost
            post={post}
            assignedCategoryIds={assignedCategories.map(c => c.categoryId)}
        />
    );
}