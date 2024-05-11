
import { configureStore } from '@reduxjs/toolkit'
import noticifationReducer from './reducers/noticifationReducer'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    notification: noticifationReducer,
    blogs: blogsReducer,
    user: userReducer
  }
})

export default store


