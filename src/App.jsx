import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import { notifyWith } from './reducers/noticifationReducer'
import { getBlogs, createBlog, removeBlog, likeBlog } from './reducers/blogsReducer'
import { setUser, clearUser } from './reducers/userReducer'
import { getUsers } from './reducers/usersReducer'
import { Routes, Route } from 'react-router-dom'
import BlogList from './components/BlogList'
import BlogDetail from './components/BlogDetail'

const App = () => {
  const user = useSelector(({ user }) => user)

  const dispatch = useDispatch()

  const createFormRef = useRef()

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(setUser())
  },[dispatch])

  useEffect(() => {
    dispatch(getUsers())
  },[dispatch])

  const logout = () => {
    dispatch(clearUser())
    dispatch(notifyWith('Logged out!'))
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
      {!user && <LoginForm />}
      {user && <div>
        <h2>blogs</h2>
        <p>{user.name} logged in <button onClick={logout}>logout</button></p>
        <Togglable buttonLabel='new blog' ref={createFormRef} >
          <CreateForm
            createNewBlog={createNewBlog}
          />
        </Togglable>
        <Routes>
          <Route path='/' element={<BlogList />}/>
          <Route path='/users' element={<Users />} />
          <Route path='/users/:id' element={<User />} />
          <Route path='/blogs/:id' element={<BlogDetail />} />
        </Routes>
      </div>}
    </div>
  )
}

export default App