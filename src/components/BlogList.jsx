
import Blog from './Blog'
import Togglable from './Togglable'
import CreateForm from './CreateForm'
import { likeBlog, removeBlog, createBlog } from '../reducers/blogsReducer'
import { notifyWith } from '../reducers/noticifationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'

const BlogList = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)

  const createFormRef = useRef()

  const createNewBlog = async (newBlog) => {
    try {
      dispatch(createBlog(newBlog))
      dispatch(notifyWith(`New blog '${newBlog.title}' by '${newBlog.author}' added!`))
      createFormRef.current.toggleVisibility()
    } catch(error) {
      dispatch(notifyWith(error.response.data.error, 'error'))
    }
  }

  const blogLike = async (blog) => {
    dispatch(likeBlog({ ...blog, likes: blog.likes + 1, user: blog.user.id }))
    dispatch(notifyWith(`You liked '${blog.title}' by '${blog.author}'`))
  }

  const remove = async (blog) => {
    if(window.confirm(`Are you sure you want to remove '${blog.title}' by '${blog.author}'?`)) {
      dispatch(removeBlog(blog.id))
      dispatch(notifyWith(`Blog '${blog.title}' by '${blog.author}' removed.`))
    }
  }

  return (
    <>
      <h2>blogs</h2>
      <Togglable buttonLabel='new blog' ref={createFormRef} >
        <CreateForm
          createNewBlog={createNewBlog}
        />
      </Togglable>
      {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          blogLike={() => blogLike(blog)}
          remove={() => remove(blog)}
          canRemove={user && blog.user.username === user.username}
        />
      )}
    </>
  )
}



export default BlogList