const initialState = {
  events: [],
  stories: [],
  calendar: []
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
    case "FETCH_CALENDAR":
      return {
        ...state,
        calendar: action.payload
      }
    default:
      return state
  }
}

export default reducer;