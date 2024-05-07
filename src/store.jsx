
import { configureStore } from '@reduxjs/toolkit'
import noticifationReducer from './reducers/noticifationReducer'

const store = configureStore({
  reducer: {
    notification: noticifationReducer
  }
})

export default store


