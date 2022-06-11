import { useEffect, useState } from 'react'
import ButtonGroup from './ButtonGroup'

function Post(props: any) {
  const {
    dispatch,
    post: {
      id, title: propTitle, body: propBody
    },
    postToEdit,
    submitEdit,
    toggleEditForm
  } = props

  const [title, setTitle] = useState(propTitle)
  const [body, setBody] = useState(propBody)
  const [isEditing, setIsEditing] = useState(postToEdit === id)

  useEffect(() => {
    setIsEditing(postToEdit === id)
  }, [postToEdit, id])

  const resetState = () => {
    setTitle(propTitle)
    setBody(propBody)
  }

  const handleSubmit = (e:any) => {
    e.preventDefault()
    const formData = {
      post: {
        id,
        title,
        body,
      }
    }
    submitEdit(formData)
    resetState()
  }

  const titleElement = <h2 className="title text-start">{propTitle}</h2>
  const bodyElement = <p className="card-text text-start">{propBody}</p>

  const editableTitle = (
    <input
      type="text"
      className="form-control text-start"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  )

  const editableBody = (
    <textarea
      className="form-control text-start"
      value={body}
      onChange={(e) => setBody(e.target.value)}
    />
  )

  const submitButton = (
    <button
      type="submit"
      className="btn btn-success mt-2"
      onClick={(e) => handleSubmit(e)}
    >
      Submit
    </button>
  )

  return (
    <div>
      <div className="row">
        <div className="col-8">
          {isEditing ? editableTitle : titleElement}
        </div>
        <div className="col-4">
          <ButtonGroup
            postId={id}
            dispatch={dispatch}
            toggleEditForm={toggleEditForm}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-8">
          {isEditing ? editableBody : bodyElement}
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          {isEditing ? submitButton : ''}
        </div>
      </div>
    </div>

  )
}

export default Post
