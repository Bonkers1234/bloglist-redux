
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { notifyWith } from '../reducers/noticifationReducer'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const userInfo = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(userInfo))
      blogService.setToken(userInfo.token)
      setUser(userInfo)
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