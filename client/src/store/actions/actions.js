import { getStorage } from "../../common/common";
import { listen } from "../../common/socket";

export const initialQuotes = (payload) => {
  return {
    type: 'GET_QUOTES',
    payload
  }
}

export const getQuotes = () => {
  return (dispatch) => {
    listen('ticker', (quotes) => {
      dispatch(initialQuotes(quotes))
      dispatch(initialDisableQuotes());
    })
    
  }
}

export const initialDisableQuotes = () => {
  const payload = getStorage('disabled_tickers')

  return {
    type: 'INIT_DISABLE_TICKER',
    payload
  }
}
