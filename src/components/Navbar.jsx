
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../reducers/userReducer'
import { notifyWith } from '../reducers/noticifationReducer'

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  const logout = () => {
    dispatch(clearUser())
    dispatch(notifyWith('Logged out!'))
  }

  const style = {
    marginRight: 5
  }

  const divStyle = {
    background: 'lightgrey',
    padding: 5
  }

  return (
    <>
      <div style={divStyle}>
        <Link to={'/'} style={style} >blogs</Link>
        <Link to={'/users'} style={style} >users</Link>
        <span>{user.name} logged in <button onClick={logout}>logout</button></span>
      </div>
      <div>
        <h2>Blog app</h2>
      </div>
    </>
  )
}

export default Navbar