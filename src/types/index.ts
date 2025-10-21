interface MarkdownEditorProps {
    value: string;
    onChange: (value:string) => void;
}

interface Post {
    id: number;
    title: string;
    content: string;
    slug: string;
    published: boolean | null;
    createdAt: string | null;
    updatedAt: string | null;
}

interface PostStore {
    posts: Post[],
    selectedPost: Post | null;
    isLoading: boolean;
    error: string | null;
    // functions
    setPosts: (posts: Post[])=>void;
    setSelectedPost: (post: Post | null) => void;
    addPost: (post:Post)=>void;
    updatePost: (id: number, updates: Partial<Post>) => void;
    deletePost: (id: number) => void;
    setLoading: (loading: boolean)=> void;
    setError: (error:string | null) => void;
    clearError: ()=> void;
}