export interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  slug: string;
  published: boolean | null;
  createdAt: string | Date | null;
  updatedAt: string | Date | null;
}

export interface PostStore {
  posts: Post[],
  selectedPost: Post | null;
  isLoading: boolean;
  error: string | null;
  // functions
  setPosts: (posts: Post[]) => void;
  setSelectedPost: (post: Post | null) => void;
  addPost: (post: Post) => void;
  updatePost: (id: number, updates: Partial<Post>) => void;
  deletePost: (id: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export interface PostActionsProps {
  postId: number;
  slug: string;
}

export interface EditPostProps {
  post: Post;
  assignedCategoryIds: number[];
}

export interface Category {
  id: number;
  name: string;
  description: string | null;
  slug: string;
}

export interface PostWithCategories extends Post {
  categories: Category[]
}

export interface PostCardProps {
  post: PostWithCategories;
  showStatus: boolean | null;
}