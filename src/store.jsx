
import { configureStore } from '@reduxjs/toolkit'
import noticifationReducer from './reducers/noticifationReducer'
import blogsReducer from './reducers/blogsReducer'

const store = configureStore({
  reducer: {
    notification: noticifationReducer,
    blogs: blogsReducer
  }
})

export default store


