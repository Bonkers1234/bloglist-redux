
import { configureStore } from '@reduxjs/toolkit'
import noticifationReducer from './reducers/noticifationReducer'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    notification: noticifationReducer,
    blogs: blogsReducer,
    user: userReducer,
    users: usersReducer
  }
})

export default store


