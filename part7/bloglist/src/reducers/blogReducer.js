import {createEntityAdapter, createSelector, createSlice} from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import {refreshUser, selectUserById} from './usersReducer'

const blogAdapter = createEntityAdapter()

const blogSlice = createSlice({
  name: 'blogs',
  initialState: blogAdapter.getInitialState(),
  reducers: {
    addBlog(state, action) {
      blogAdapter.upsertOne(state, action.payload)
    },
    replaceBlog(state, action) {
      blogAdapter.upsertOne(state, action.payload)
    },
    deleteBlog(state, action) {
      blogAdapter.removeOne(state, action.payload)
    },
    setBlogs(state, action) {
      blogAdapter.upsertMany(state, action.payload)
    }
  }
})

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
  return async (dispatch, getState) => {
    const returnedObj = await blogService.create(blogObj)
    dispatch(addBlog(returnedObj))
    await dispatch(refreshUser(returnedObj.user))
  }
}

export const updateBlog = (blogId, blogObj) => {
  return async (dispatch) => {
    const returnedObj = await blogService.update(blogId, blogObj)
    dispatch(replaceBlog(returnedObj))
  }
}

export const removeBlog = (blogObj) => {
  return async (dispatch, getState) => {
    await blogService.remove(blogObj.id)
    dispatch(deleteBlog(blogObj.id))
    await dispatch(refreshUser(blogObj.user))
  }
}

export const {
  selectAll: selectAllBlogs,
  selectById: selectBlogById,
  selectIds: selectBlogIds
  // Pass in a selector that returns the user slice of state
} = blogAdapter.getSelectors(state => state.blogs)

// memoized selector:
// createSelector function that generates memoized selectors that will only recalculate results when the inputs change
// NOT EFFICIENT!
// export const selectBlogsByUserId = createSelector(
//     // userId is given in a selector function (state, param) => ...
//     [selectAllBlogs, (state, userId) => userId],
//     (blogs, userId) => blogs.filter(blog => blog.user === userId)
// )

// MORE EFFICIENT!
// as we upsert (update when exists) blogs in blogAdapter, we also try to read/select blogs from the state.
// this will result in a dirty read (a transaction reads data that has not yet been committed --> UNDEFINED type!)
// thus, we filter out undefined data type.
// While Redux state is populated with blogs, re-selection happens, which triggers re-rendering -->
// a loop until all blogs are populated
export const selectBlogsByUserId = (state, userId) => {
  const user = selectUserById(state, userId)
  return user ? user.blogs.map(id => selectBlogById(state, id)).filter(blog => blog !== undefined) : []
}

// selectBlogsByUserId w/o memoization
// export const selectBlogsByUserId = (state, userId) => Object.values(state.blogs.entities).filter(e => e.user === userId)

// outputs list of blog object filtered by blog ids
// export const selectBlogsByIds = (state, blogIds) => blogIds.map(id => selectBlogById(state, id))

