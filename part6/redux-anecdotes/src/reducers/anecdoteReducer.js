const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

// action creator for a vote event
// action is an object with a type field describing the event, and additional info needed to perform the event:
// in our case --> an obj {id: id} with id of an anecdote that needs to be updated
export const vote = (id) => {
  return {
    type: 'VOTE',
    data: { id }  // or { id: id }
  }
}

// action creator for adding anecdote event
export const addAnecdote = (anecdote) => {
  return {
    type: 'CREATE_ANECDOTE',
    data: anecdote
  }
}


const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// take an anecdote string and create an object
// that will be stored in the List of Objects as a Redux state
const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE': {
      // find by id an anecdote obj in a list of obj (our state)
      const id = action.data.id
      const objToChange = state.find(obj => obj.id === id)
      // create a new anecdote obj with updated votes
      const newObj = {
        ...objToChange,
        votes: objToChange.votes + 1
      }
      // replace the old obj in the state with the new obj
      return state.map(obj => obj.id === id ? newObj : obj)
    }

    case 'CREATE_ANECDOTE': {
      const newObj = asObject(action.data)
      // remember: concat creates a new list, which is what we need - a new state!
      return state.concat(newObj)
    }
  }


  return state
}

export default anecdoteReducer