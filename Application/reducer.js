const initialState = {
  darkModeIsEnabled: false,
  events: [],
  stories: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      return {
        ...state,
        darkModeIsEnabled: !state.darkModeIsEnabled
      }
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
    default:
      return state
  }
}

export default reducer;