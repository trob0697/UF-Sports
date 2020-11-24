const initialState = {
  darkModeIsEnabled: false,
  results: [],
  events: [],
  stories: [],
  calendar: [],
  news: []
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
    default:
      return state
  }
}

export default reducer;