
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../reducers/userReducer'
import { notifyWith } from '../reducers/noticifationReducer'

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  const navigate = useNavigate()

  const logout = () => {
    dispatch(clearUser())
    navigate('/')
    dispatch(notifyWith('Logged out!'))
  }

  return (
    <>
      <div className='bg-info bg-gradient p-2'>
        <Link to={'/'} className='btn btn-primary me-2' >blogs</Link>
        <Link to={'/users'} className='btn btn-primary me-2' >users</Link>
        <span>{user.name} logged in <button className='btn btn-light' onClick={logout}>logout</button></span>
      </div>
      <div>
        <h2>Blog app</h2>
      </div>
    </>
  )
}

export default Navbar