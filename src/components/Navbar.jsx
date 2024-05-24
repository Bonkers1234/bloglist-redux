
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../reducers/userReducer'

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  const navigate = useNavigate()

  const logout = () => {
    dispatch(clearUser())
    navigate('/')
  }

  return (
    <>
      <nav className='navbar navbar-expand-sm'>
        <div className='container row bg-info bg-gradient position-relative p-2 w-100'>
          <div className="col">
            <button className='navbar-toggler' data-bs-toggle='collapse' data-bs-target='#nav'>
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className="collapse navbar-collapse" id='nav'>
              <ul className='navbar-nav'>
                <li className='nav-item my-1 my-sm-0'><Link to={'/'} className='btn btn-primary me-1' >blogs</Link></li>
                <li className='nav-item my-1 my-sm-0'><Link to={'/users'} className='btn btn-primary me-1' >users</Link></li>
              </ul>
            </div>
          </div>
          <div className="col">
            <span className='position-absolute top-0 end-0 m-2'>{user.name} logged in <button className='btn btn-light' onClick={logout}>logout</button></span>
          </div>
        </div>
      </nav>
      <div>
        <h2>Blog app</h2>
      </div>
    </>
  )
}

export default Navbar