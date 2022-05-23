import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { refreshUser } from './usersReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      return state.concat(action.payload)
    },
    replaceBlog(state, action) {
      const blogId = action.payload.id
      const blogObj = action.payload.obj
      return state.map(b => b.id === blogId ? blogObj : b)
    },
    deleteBlog(state, action) {
      const blogObj = action.payload
      return state.filter(b => b.id !== blogObj.id)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const selectBlogByUserId = (state, userId) =>
  state.blogs.filter(blog => blog.user.id === userId)

export const selectBlogById = (state, id) =>
  state.blogs.find(blog => blog.id === id)

export const { addBlog, replaceBlog, setBlogs, deleteBlog } = blogSlice.actions
export default blogSlice.reducer

// thunk function creator
export const initializeBlogs = () => {
  return async (dispatch) => {
    const initialData = await blogService.getAll()
    dispatch(setBlogs(initialData))
  }
}

export const createBlog = (blogObj) => {
  return async (dispatch) => {
    const returnedObj = await blogService.create(blogObj)
    dispatch(addBlog(returnedObj))
    await dispatch(refreshUser(returnedObj.user.id))
  }
}

export const updateBlog = (blogId, blogObj) => {
  return async (dispatch) => {
    const returnedObj = await blogService.update(blogId, blogObj)
    dispatch(replaceBlog({ id: blogId, obj: returnedObj }))
  }
}

export const removeBlog = (blogObj) => {
  return async (dispatch) => {
    await blogService.remove(blogObj.id)
    dispatch(deleteBlog(blogObj))
    await dispatch(refreshUser(blogObj.user.id))
  }
}