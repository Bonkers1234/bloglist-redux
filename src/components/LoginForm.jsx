
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
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
                    username
          <input
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
                    password
          <input
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm