import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface ObjectModel {
  id: number;
  title: string;
  description: string;
  type: string;
  score: number;
}

interface PostsState {
  posts: ObjectModel[];
  loading: boolean;
  error: string | null;
  recentPosts: ObjectModel[];
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
  recentPosts: []
};

export const fetchPosts = createAsyncThunk('posts/GetAll', async () => {
  const response = await axios.get<ObjectModel[]>('/api/Posts');
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    addRecentPost(state, action) {
      const post = action.payload;
      state.recentPosts = [post, ...state.recentPosts.filter(p => p.id !== post.id)].slice(0, 3);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch posts';
      });
  },
});
export const { setPosts, addRecentPost } = postsSlice.actions;
export default postsSlice.reducer;
