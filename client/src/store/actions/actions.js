import { getStorage, actionTicker } from "../../common/common";

export const getData = (quotes) => {
  let exclude = getStorage('exclude_quotes');
  const payload = quotes.filter((ticker) => {
    if(exclude.indexOf(ticker.ticker) === -1){
      return ticker;
    }
  })

  return {
    type: 'GET_DATA',
    payload
  }
}

export const setDisabledTickers = (quote) => {
  const payload = actionTicker('disabled_tickers', quote);
  
  return {
    type: 'SET_DISABLED_TICKERS',
    payload
  }
}

export const getDisabledTickers = () => {
  let disabled = getStorage('disabled_tickers');
  const payload = disabled;
  
  return {
    type: 'SET_DISABLED_TICKERS',
    payload
  }
}