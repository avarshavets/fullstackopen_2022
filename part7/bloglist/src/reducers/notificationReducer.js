import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  // timeoutId stores the timer indicating when the notification is removed.
  initialState: { message: '', type: 'info', timeoutId: 0 },
  reducers: {
    notificationChange(state, action) {
      return state = action.payload
    },
    removeNotification(state) {
      return { message: '', type:'info', timeoutId: 0 }
    }
  }
})

export const { notificationChange, removeNotification } = notificationSlice.actions

// thunk action creator
export const setNotification = (message, type, displaySeconds) => {
  // thunk function
  return (dispatch, getState) => {
    const prevTimeoutId = getState().notification.timeoutId
    clearTimeout(prevTimeoutId)
    const timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, displaySeconds*1000) // *1000 to seconds into milliseconds
    dispatch(notificationChange({ message, type, timeoutId }))
  }
}

export default notificationSlice.reducer