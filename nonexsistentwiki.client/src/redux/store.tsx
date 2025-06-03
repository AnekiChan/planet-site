import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import { authSlice } from './Auth'

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;