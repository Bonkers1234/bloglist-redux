
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
    dispatch(createBlog(newBlog))
    createFormRef.current.toggleVisibility()
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
      <div className="row row-cols-1 row-cols-sm-2 gx-2">
        {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
          <div key={blog.id} className="col">
            <Blog
              key={blog.id}
              blog={blog}
              blogLike={() => blogLike(blog)}
              remove={() => remove(blog)}
              canRemove={user && blog.user.username === user.username}
            />
          </div>
        )}
      </div>
    </>
  )
}



export default BlogList