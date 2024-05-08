
import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    blogGet(state, action) {
      return action.payload
    },
    blogCreate(state, action) {
      return state.concat(action.payload)
    },
    blogDelete(state, action) {
      return state.filter(b => b.id !== action.payload)
    },
    blogLike(state, action) {
      return state.map(b => b.id === action.payload.id ? action.payload : b)
    }
  }
})

export const { blogGet, blogCreate, blogDelete, blogLike } = blogsSlice.actions

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(blogGet(blogs))
  }
}

export const createBlog = (object) => {
  return async dispatch => {
    const newBlog = await blogService.create(object)
    dispatch(blogCreate(newBlog))
  }
}

export const removeBlog = (objectId) => {
  return async dispatch => {
    await blogService.remove(objectId)
    dispatch(blogDelete(objectId))
  }
}

export const likeBlog = (object) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(object)
    dispatch(blogLike(updatedBlog))
  }
}

export default blogsSlice.reducer
