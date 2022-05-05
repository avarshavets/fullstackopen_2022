import {createSlice} from "@reduxjs/toolkit"

const notificationSlice= createSlice({
    // name of the state slice (piece of state) that will be handled by the reducer
    name: 'notification',
    initialState: 'some initial notification',
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
            return state = ''
        }
    }
})

// notification.actions generates the action creators from our notificationSlice
export const { notificationChange, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer