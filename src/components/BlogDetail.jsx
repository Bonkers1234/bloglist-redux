import { useDispatch, useSelector } from 'react-redux'
import { likeBlog } from '../reducers/blogsReducer'
import { notifyWith } from '../reducers/noticifationReducer'
import { useParams } from 'react-router-dom'


const BlogDetail = () => {
  const blogId = useParams().id
  const blog = useSelector(({ blogs }) => blogs.find(blog => blog.id === blogId))
  const dispatch = useDispatch()
  console.log(blog)

  const blogLike = async (blog) => {
    dispatch(likeBlog({ ...blog, likes: blog.likes + 1, user: blog.user.id }))
    dispatch(notifyWith(`You liked '${blog.title}' by '${blog.author}'`))
  }

  if(!blog) {
    return null
  }

  return (
    <div>
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <div><a href={`${blog.url}`}>{blog.url}</a></div>
      <div>{blog.likes} likes <button onClick={() => blogLike(blog)}>like</button></div>
      <div>added by {blog.user.name}</div>
    </div>
  )
}

export default BlogDetail