import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import usersService from '../services/users'

const userAdapter = createEntityAdapter()

// getInitialState() generates an empty {ids: [], entities: {}} object as initial state
//   users: {
//     ids: ["user1", "user2", "user3"],
//     entities: {
//       "user1": {id: "user1", firstName, lastName},
//     }}

const usersSlice = createSlice({
  name: 'users',
  initialState: userAdapter.getInitialState(),
  reducers: {
    upsertUsers(state, action) {
      userAdapter.upsertMany(state, action.payload)
      // entities is an object. To retrieve the data, call Object.values() for list of values
      // console.log('object', Object.values(state.entities))
    },
    replaceUser(state, action) {
      userAdapter.upsertOne(state, action.payload)
    }
  }
})


export const { replaceUser, upsertUsers } = usersSlice.actions
export default usersSlice.reducer

export const initializeUsers = () => {
  return async (dispatch, getState) => {
    const initialData = await usersService.getAll()
    dispatch(upsertUsers(initialData))
  }
}

export const refreshUser = (userId) => {
  return async (dispatch) => {
    const returnedObj = await usersService.get(userId)
    dispatch(replaceUser(returnedObj))
  }
}

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds
  // Pass in a selector that returns the user slice of state
} = userAdapter.getSelectors(state => state.users)