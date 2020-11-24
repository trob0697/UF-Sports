const initialState = {
  darkModeIsEnabled: false,
  results: [],
  events: [],
  news: [],
  calendar: [],
  rosters: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      return {
        ...state,
        darkModeIsEnabled: !state.darkModeIsEnabled
      }
    case "FETCH_RESULTS":
      return {
        ...state,
        results: action.payload
      }
    case "FETCH_EVENTS":
      return {
        ...state,
        events: action.payload
      }
    case "FETCH_NEWS":
      return {
        ...state,
        news: action.payload
      }
    case "FETCH_CALENDAR":
      return {
        ...state,
        calendar: action.payload
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