
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notifyWith } from '../reducers/noticifationReducer'
import { loginUser } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(loginUser({ username, password }))
      setUsername('')
      setPassword('')
      dispatch(notifyWith('Welcome'))
    } catch(exception) {
      setUsername('')
      setPassword('')
      dispatch(notifyWith(exception.response.data.error, 'error'))
    }
  }

  return (
    <div className='text-center mt-5'>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin} className='w-25 mx-auto'>
        <div className='form-floating mb-3'>
          <input
            className='form-control'
            placeholder='Username'
            type="text"
            name="Username"
            id='Username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <label htmlFor='Username'>Username</label>
        </div>
        <div className='form-floating mb-3'>
          <input
            className='form-control'
            placeholder='Password'
            type="password"
            name="Password"
            id='Password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <label htmlFor='Password'>Password</label>
        </div>
        <button className='btn btn-outline-primary' type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm