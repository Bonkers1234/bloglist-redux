import { useDispatch, useSelector } from 'react-redux'
import { addCommentBlog, likeBlog } from '../reducers/blogsReducer'
import { notifyWith } from '../reducers/noticifationReducer'
import { useParams } from 'react-router-dom'
import { useState } from 'react'


const BlogDetail = () => {
  const [comment, setComment] = useState('')
  const blogId = useParams().id
  const blog = useSelector(({ blogs }) => blogs.find(blog => blog.id === blogId))
  const dispatch = useDispatch()

  const blogLike = async (blog) => {
    dispatch(likeBlog({ ...blog, likes: blog.likes + 1, user: blog.user.id }))
    dispatch(notifyWith(`You liked '${blog.title}' by '${blog.author}'`))
  }

  const commentSubmit = async (event) => {
    event.preventDefault()

    dispatch(addCommentBlog({ id: blog.id, comment }))
    dispatch(notifyWith('Comment added successfully!'))
    setComment('')
  }

  if(!blog) {
    return null
  }

  return (
    <>
      <div>
        <h2>
          {blog.title} - {blog.author}
        </h2>
        <div><a href={`${blog.url}`}>{blog.url}</a></div>
        <div>{blog.likes} likes <button className='btn btn-outline-primary mx-1' onClick={() => blogLike(blog)}>like</button></div>
        <div>added by {blog.user.name}</div>
      </div>
      <div>
        <h2>Comments:</h2>
        <form onSubmit={commentSubmit}>
          <div className="input-group input-group-sm w-25">
            <input
              className='form-control'
              type='text'
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
            <button
              className='input-group-text btn btn-primary'
              type='submit'
            >
              add comment
            </button>
          </div>
        </form>
        <ul>
          {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
        </ul>
      </div>
    </>
  )
}

export default BlogDetail