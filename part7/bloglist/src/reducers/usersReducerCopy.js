import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import usersService from '../services/users'

const initialState = createEntityAdapter().getInitialState({
  ids: [],
  entities: {}
})

// id: ['user1', 'user2']
// entities: {
//    'user1': {id: 'user1', username, name, blogs: []},
//    'user2': {id: 'user2', username, name},
// }
const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },

    replaceUser(state, action) {
      const userId = action.payload.id
      const userObj = action.payload.obj
      return state.map(user => user.id === userId ? userObj : user)
    }
  }
})

export const selectUserById = (state, userId) =>
  state.users.find(user => user.id === userId)

export const { setUsers, replaceUser } = usersSlice.actions
export default usersSlice.reducer

export const initializeUsers = () => {
  return async (dispatch) => {
    const initialData = await usersService.getAll()
    dispatch(setUsers(initialData))
  }
}

export const refreshUser = (userId) => {
  return async (dispatch) => {
    const returnedObj = await usersService.get(userId)
    dispatch(replaceUser({ id: userId, obj: returnedObj } ))
  }
}