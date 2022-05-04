const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

// selector function
export const selectGoodValue = state => state.good

// action creator function
export const voteActionCreator = (inputType) => {
  return {
    type: inputType
  }
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return { ...state, good: state.good + 1}
    case 'OK':
      return { ...state, ok: state.ok + 1}
    case 'BAD':
      return { ...state, bad: state.bad + 1}
    case 'ZERO':
      return { ...state, good: 0, bad: 0, ok: 0}
    default: return state
  }
  
}

export default counterReducer