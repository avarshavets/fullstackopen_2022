import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/login'
import blogService from '../services/blogs'
import usersService from '../services/users'

const userSlice = createSlice({
  name: 'user',
  // object {token, id, username, name} if not null
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer

export const addTokenForServices = (user) => {
  blogService.setToken(user.token)
  usersService.setToken(user.token)
}

const removeTokenForServices = () => {
  blogService.setToken(null)
  usersService.setToken(null)
}

// thunk function creator
export const userLogin = credentials => {
  // thunk function that accepts dispatch (and getState) as parameters
  return async (dispatch) => {
    // login service returns an object { token, username, name }
    const user = await userService.login(credentials)
    window.localStorage.setItem('loggedAppUser', JSON.stringify(user))
    dispatch(setUser(user))
    addTokenForServices(user)
  }
}

export const userLogout = () => {
  return async (dispatch) => {
    await dispatch(setUser(null))
    window.localStorage.removeItem('loggedAppUser')
    removeTokenForServices()
  }
}