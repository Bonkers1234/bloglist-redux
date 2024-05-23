
import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { notifyWith } from './noticifationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    userSet(state, action) {
      return action.payload
    },
    userClear(state, action) {
      return null
    }
  }
})

export const { userSet, userClear } = userSlice.actions

export const setUser = () => {
  return async dispatch => {
    const loggedUserJSON = localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const userInfo = JSON.parse(loggedUserJSON)
      dispatch(userSet(userInfo))
    }
  }
}

export const clearUser = () => {
  return async dispatch => {
    localStorage.removeItem('loggedBlogappUser')
    dispatch(userClear())
    dispatch(notifyWith('Logged out!'))
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    try {
      const userInfo = await loginService.login(credentials)
      localStorage.setItem('loggedBlogappUser', JSON.stringify(userInfo))
      dispatch(userSet(userInfo))
      dispatch(notifyWith('Welcome'))
    } catch(error) {
      dispatch(notifyWith(error.response.data.error, 'error'))
    }
  }
}

export default userSlice.reducer