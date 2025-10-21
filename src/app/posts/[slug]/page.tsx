import { db } from '@/server/db';
import { posts } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation'; 
import ReactMarkdown from 'react-markdown';
import PostActions from '@/components/PostActions';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await db.select().from(posts).where(eq(posts.slug, params.slug)).then(r => r[0]);

  if (!post) notFound();

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-500 mb-8">
            {new Date(post.createdAt!).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <PostActions postId={post.id} slug={post.slug} />
      </div>
      
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </div>
  );
}