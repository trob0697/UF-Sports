const initialState = {
  events: [],
  stories: [],
  rosters: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_EVENTS":
      return {
        ...state,
        events: action.payload
      }
    case "FETCH_STORIES":
      return {
        ...state,
        stories: action.payload
      }
    case "FETCH_ROSTERS":
      return {
        ...state,
        rosters: action.payload
      }
    default:
      return state
  }
}

export default reducer;