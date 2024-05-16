import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Navbar from './components/Navbar'
import { getBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import { getUsers } from './reducers/usersReducer'
import { Routes, Route } from 'react-router-dom'
import BlogList from './components/BlogList'
import BlogDetail from './components/BlogDetail'

const App = () => {
  const user = useSelector(({ user }) => user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(setUser())
  },[dispatch])

  useEffect(() => {
    dispatch(getUsers())
  },[dispatch])

  return (
    <div>
      <Notification />
      {!user
        ?  <LoginForm />
        :  <div>
          <Navbar />
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