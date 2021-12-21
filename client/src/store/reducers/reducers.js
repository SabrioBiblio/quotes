const initState = {
  current: [],
  old: [],
  disabledTickers: []
};

const reducer = (state = initState, action) => {
  switch (action.type){
    case 'GET_QUOTES':
      return {
        ...state,
        current: [...action.payload],
        old: [...state.current],
      }
    case 'INIT_DISABLE_TICKER':
      return {
        ...state,
        disabledTickers: [...action.payload]
      }
    case 'DISABLE_TICKER':
      return {
        ...state,
        disabledTickers: [...state.disabledTickers, action.payload]
      }
    default:
      return state;
  }
}

export default reducer;