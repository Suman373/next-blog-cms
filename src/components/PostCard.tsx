import { Category, PostCardProps } from "@/types";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { generateRandomHexColor, generateRandomRgbaColor } from "@/lib/utils";
import { useMemo } from "react";

export default function PostCard({ post, showStatus = false }: PostCardProps) {
    return (
        <div>
            <Link key={post.id} href={`/posts/${post.slug}`}>
                <div className="border rounded-lg p-6 hover:shadow-lg transition cursor-pointer">
                    <p className="text-sm text-slate-900 mt-4">
                        {new Date(post.createdAt!).toLocaleDateString()}
                    </p>
                    <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                    <p>{post.content.substring(0, 100)}</p>
                    {/* <ReactMarkdown>{post.content.trim().substring(0,80)}</ReactMarkdown> */}
                    <div className="flex gap-1 flex-wrap mt-3">
                        {
                            post?.categories?.length > 0 ? post.categories.map((c: Category, index: number) => {
                                const color = useMemo(()=> generateRandomRgbaColor(), []);
                                return (
                                    <Badge
                                        style={{background: color.background, border: `2px solid ${color.solid}`}}
                                        key={index}
                                        variant={"outline"}
                                        title={c.description || ""}>
                                        {c.name}
                                    </Badge>
                                )
                            }) : null
                        }
                    </div>
                </div>
            </Link>
        </div>
    )
}