import { destroyPostAsync } from './postSlice';

function ButtonGroup(props: any) {
  const { postId, dispatch, toggleEditForm } = props
  const handleClick = (e:any) => {
    const payload = {
      post: {
        postId
      }
    }
    console.log(payload)
    dispatch(destroyPostAsync(payload))
  }
  return (
    <div className="btn-group float-end">
      <button
        type="button"
        className="btn btn-warning"
        onClick={() => toggleEditForm()}
      >
        Edit
      </button>
      <button type="button" className="btn btn-danger" onClick={(e) => handleClick(e)}>Delete</button>
    </div>
  )
}

export default ButtonGroup
