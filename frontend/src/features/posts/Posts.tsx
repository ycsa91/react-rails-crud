import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../app/hooks'
import Post from './Post';
import PostForm from './PostForm';

import {
  fetchPostsAsync, selectPosts, selectStatus, Statuses, updatePostAsync
} from './postSlice';

export default function Posts() {
  const posts = useAppSelector(selectPosts)
  const status = useAppSelector(selectStatus)
  const dispatch = useDispatch()

  const [postToEdit, setPostToEdit] = useState(0)

  useEffect(() => {
    dispatch(fetchPostsAsync())
  }, [dispatch])

  const toggleEditForm = (postId?: number) => {
    if (postToEdit === postId) {
      setPostToEdit(0)
    } else {
      setPostToEdit(postId as number)
    }
  }

  const submitEdit = (formData: any) => {
    dispatch(updatePostAsync(formData))
    toggleEditForm()
  }

  let contents

  if (status !== Statuses.UpToDate) {
    contents = <div>{status}</div>
  } else {
    contents = (
      <div className="card">
        <h3>{status}</h3>
        <PostForm />
        {posts && posts.length > 0 && posts.map((post) => (
          <div key={post.id} style={{ margin: '5em' }}>
            <Post
              dispatch={dispatch}
              post={post}
              toggleEditForm={() => toggleEditForm(post.id)}
              postToEdit={postToEdit}
              submitEdit={submitEdit}
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <h1>Posts</h1>
      {contents}
    </div>
  )
}
