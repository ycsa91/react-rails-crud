import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createPostAsync } from './postSlice'

function PostForm() {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const resetState = () => {

  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const formData = {
      post: {
        title,
        body,
      }
    }

    dispatch(createPostAsync(formData))
    resetState()
    console.log('Submitting')
  }

  return (
    <div className="card-body bg-info text-dark col-12 col-md-4 m-auto">
      <h1>PostForm</h1>
      <form>
        <input
          type="text"
          className="form-control mb-3 rounded-0 shadow-none border-0 text-start"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="form-control mb-3 rounded-0 shadow-none border-0 text start"
          name="body"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          cols={30}
          rows={10}
        />
        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default PostForm
