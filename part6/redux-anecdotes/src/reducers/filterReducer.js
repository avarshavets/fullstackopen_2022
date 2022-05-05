import {createSlice} from "@reduxjs/toolkit"

const filterSlice = createSlice({
    // piece of state and prefix to action.type name
    name: 'filter',
    initialState: '',
    // object of reducer functions (function name is a part of an action.type name --> filter/filterChange)
    reducers: {
        // when dispatching an action, the argument in action creator assigned to the action.payload
        // dispatch(filterChange('text')) <-->
        // dispatch({ type: 'filter/filterChange', payload: 'text'})
        filterChange(state, action) {
            // Immer transforms 'mutating' statement for the state
            return action.payload
        }
    }
})

// generating action creator from filterSlice.actions and exporting it as a constant
export const { filterChange } = filterSlice.actions
export default filterSlice.reducer