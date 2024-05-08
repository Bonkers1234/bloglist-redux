import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { notifyWith } from './reducers/noticifationReducer'
import { getBlogs, createBlog, removeBlog, likeBlog } from './reducers/blogsReducer'

const App = () => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)

  const createFormRef = useRef()

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const userInfo = JSON.parse(loggedUserJSON)
      setUser(userInfo)
      blogService.setToken(userInfo.token)
    }
  },[])

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    dispatch(notifyWith('Logged out!'))
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

  const createNewBlog = async (newBlog) => {
    try {
      dispatch(createBlog(newBlog))
      dispatch(notifyWith(`New blog '${newBlog.title}' by '${newBlog.author}' added!`))
      createFormRef.current.toggleVisibility()
    } catch(error) {
      dispatch(notifyWith(error.response.data.error, 'error'))
    }
  }

  return (
    <div>
      <Notification />
      {!user && <LoginForm setUser={setUser} />}
      {user && <div>
        <h2>blogs</h2>
        <p>{user.name} logged in <button onClick={logout}>logout</button></p>
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
      </div>}
    </div>
  )
}

export default App