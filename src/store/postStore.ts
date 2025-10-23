import { PostStore } from '@/types';
import {create} from 'zustand';

export const usePostStore = create<PostStore>((set)=> ({
    posts: [],
    selectedPost: null,
    isLoading: false,
    error: null,

    setPosts: (posts) => set({posts}),
    setSelectedPost: (post) => set({selectedPost: post}),
    addPost: (post)=> set((state)=> ({
        posts: [post,...state.posts]
    })),
    updatePost : (id, updates) => set((state)=> ({
        posts: state.posts.map((post)=> post.id === id ? {...post, ...updates}: post)
    })),
    deletePost: (id) => set((state)=> ({
        posts: state.posts.filter(post=> post.id !== id),
        selectedPost: state.selectedPost?.id === id ? null : state.selectedPost
    })),
    setLoading: (loading)=> set({isLoading : loading}),
    setError: (error)=> set({error}),
    clearError: ()=> set({error: null}) ,
}));