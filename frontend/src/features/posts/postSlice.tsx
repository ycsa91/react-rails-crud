/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import produce from 'immer';
import { RootState } from '../../app/store';
import {
  fetchPosts, createPost, updatePost, destroyPost
} from './postAPI';

export enum Statuses {
  Initial = 'Not Fetched',
  Loading = 'Loading...',
  UpToDate = 'Up To Date',
  Deleted = 'Deleted',
  Error = 'Error'
}

export interface PostFormData {
  post: {
    id?: string
    title: string
    body: string
  }
}

export interface PostState {
  id?: number
  title?: string
  body?: string
  created_at?: any
  updated_at?: any
}

export interface PostsState {
  posts: PostState[]
  status: string
}

export interface PostUpdateData {
  postId: number
  post: PostState
}

export interface PostDeleteData {
  post: {
    postId: number;
  }
}

const initialState: PostsState = {
  posts: [
    {
      id: 0,
      title: '',
      body: '',
      created_at: '',
      updated_at: '',
    }
  ],
  status: Statuses.Initial
}

export const fetchPostsAsync: any = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await fetchPosts()
    return response
  }
)

export const createPostAsync: any = createAsyncThunk(
  'posts/createPost',
  async (payload: PostFormData) => {
    const response = await createPost(payload)
    return response
  }
)

export const updatePostAsync: any = createAsyncThunk(
  'posts/updatePost',
  async (payload: PostFormData) => {
    const response = await updatePost(payload)
    return response
  }
)

export const destroyPostAsync: any = createAsyncThunk(
  'posts/destroyPost',
  async (payload: PostDeleteData) => {
    const response = await destroyPost(payload)
    return response
  }
)

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  /**
   * Synchronous actions
   */
  reducers: {},
  extraReducers: (builder) => {
    builder
    /**
     * While you wait
     */
      .addCase(fetchPostsAsync.pending, (state) => produce(state, (draftState) => {
        draftState.status = Statuses.Loading
      }))
    /**
     * You got the thing
     */

      .addCase(fetchPostsAsync.fulfilled, (state, action) => produce(state, (draftState) => {
        draftState.posts = action.payload
        draftState.status = Statuses.UpToDate
      }))
    /**
     * Error
     */
      .addCase(fetchPostsAsync.rejected, (state) => produce(state, (draftState) => {
        draftState.status = Statuses.Error
      }))
      /** Update Section */
      /**
     * While you wait
     */
      .addCase(createPostAsync.pending, (state) => produce(state, (draftState) => {
        draftState.status = Statuses.Loading
      }))
    /**
     * You got the thing
     */

      .addCase(createPostAsync.fulfilled, (state, action) => produce(state, (draftState) => {
        draftState.posts.push(action.payload)
        draftState.status = Statuses.UpToDate
      }))
    /**
     * Error
     */
      .addCase(createPostAsync.rejected, (state) => produce(state, (draftState) => {
        draftState.status = Statuses.Error
      }))
      /** Update Section */
      /**
     * While you wait
     */
      .addCase(updatePostAsync.pending, (state) => produce(state, (draftState) => {
        draftState.status = Statuses.Loading
      }))
    /**
     * You got the thing
     */

      .addCase(updatePostAsync.fulfilled, (state, action) => produce(state, (draftState) => {
        const index = draftState.posts.findIndex(
          (post) => post.id === action.payload.id
        )
        draftState.posts[index] = action.payload
        draftState.status = Statuses.UpToDate
      }))
    /**
     * Error
     */
      .addCase(updatePostAsync.rejected, (state) => produce(state, (draftState) => {
        draftState.status = Statuses.Error
      }))
      /** Destroy Section */
      /**
     * While you wait
     */
      .addCase(destroyPostAsync.pending, (state) => produce(state, (draftState) => {
        draftState.status = Statuses.Loading
      }))
    /**
     * You got the thing
     */

      .addCase(destroyPostAsync.fulfilled, (state, action) => produce(state, (draftState) => {
        draftState.posts = action.payload
        draftState.status = Statuses.UpToDate
      }))
    /**
     * Error
     */
      .addCase(destroyPostAsync.rejected, (state) => produce(state, (draftState) => {
        draftState.status = Statuses.Error
      }))
  }
})

export const {} = postSlice.actions

export const selectPosts = (state: RootState) => state.posts.posts

export const selectStatus = (state: RootState) => state.posts.status

export default postSlice.reducer
