
import Blog from './Blog'
import { likeBlog, removeBlog } from '../reducers/blogsReducer'
import { notifyWith } from '../reducers/noticifationReducer'
import { useDispatch, useSelector } from 'react-redux'

const BlogList = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)

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