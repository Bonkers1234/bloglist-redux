import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { notifyWith } from './reducers/noticifationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const createFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

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
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const updatedBlog = await blogService.update(blogToUpdate)
    dispatch(notifyWith(`You liked '${blog.title}' by '${blog.author}'`))
    setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
  }

  const remove = async (blog) => {
    if(window.confirm(`Are you sure you want to remove '${blog.title}' by '${blog.author}'?`)) {
      await blogService.remove(blog.id)
      dispatch(notifyWith(`Blog '${blog.title}' by '${blog.author}' removed.`))
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  const createBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      dispatch(notifyWith(`New blog '${newBlog.title}' by '${newBlog.author}' added!`))
      setBlogs(blogs.concat(createdBlog))
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
            createBlog={createBlog}
          />
        </Togglable>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
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