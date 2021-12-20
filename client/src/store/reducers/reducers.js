const initState = {
  current: [],
  old: [],
  disabledTickers: []
};

const reducer = (state = initState, action) => {
  switch (action.type){
    case 'GET_DATA':
      return {
        ...state,
        current: [...action.payload],
        old: [...state.current],
      }
    case 'SET_DISABLED_TICKERS':
      return {
        ...state,
        disabledTickers: [...action.payload]
      }
    default:
      return state;
  }
}

export default reducer;