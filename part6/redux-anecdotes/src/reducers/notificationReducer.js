import {createSlice} from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    // name of the state slice (piece of state) that will be handled by the reducer
    name: 'notification',
    // timeoutId stores the timer indicating when the notification is removed.
    initialState: {message: '', timeoutId: 0},
    // reducers is an object of 'case reducers' similar to a case in a switch statement of a single reducer
    // reducers: { rFunction1(), rFunction2() } <--> reducers: {'rFunction1': rFunction1(), 'rFunction2': rFunction2() }
    // the key (name of a function) generates action's type value --> notification/notificationChange
    // functions of reducer object handle state changes caused by an action
    reducers: {
        // Note that the action.payload in the function contains the argument provided by calling the action creator
        // dispatch(notificationChange('new message')) <-->
        // dispatch({ type: 'notification/notificationChange', payload: 'new message'})
        notificationChange(state, action) {
            // createSlice uses Immer to replace the old state with the new one defined in return
            return state = action.payload
        },
        removeNotification(state) {
            return state = {message: '', timeoutId: 0}
        }
    }
})

// notification.actions generates the action creators from our notificationSlice
export const { notificationChange, removeNotification } = notificationSlice.actions

// Consider the following case:
// there are 2 notification one after another.
// the timer of the first notification has not yet passed,
// but there is already the second notification with the second timer.
// In this case, the first timer will be applied to the second notification.
// To fix this bug, we need to remove the first timer of the first message.
// We can store the message and it's timer (timeoutId) as an object in notification state piece.
// When we run the thunk function, we will get the timeoutId from the previous notification,
// and clear it using clearTimeout

// thunk action creator
export const setNotification = (message, displaySeconds) => {
    // thunk function
    return (dispatch, getState) => {
        const prevTimeoutId = getState().notification.timeoutId
        clearTimeout(prevTimeoutId)
        // setTimeout returns an ID that can be used in clearTimeout
        const timeoutId = setTimeout(() => {
            dispatch(removeNotification())
        }, displaySeconds*1000) // *1000 to seconds into milliseconds
        dispatch(notificationChange({message, timeoutId}))
    }
}

export default notificationSlice.reducer