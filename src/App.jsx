import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { useStartupData } from './hooks'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'
import User from './components/User'
import Navbar from './components/Navbar'
import BlogList from './components/BlogList'
import BlogDetail from './components/BlogDetail'

const App = () => {
  const user = useSelector(({ user }) => user)

  const startupData = useStartupData()

  useEffect(() => {
    startupData()
  },[])

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