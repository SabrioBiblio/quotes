import { getStorage, disablingQuotes } from "../../common/common";
import { listen, send } from "../../common/socket";

export const addData = (quotes) => {
  let exclude = getStorage('exclude_quotes');
  const payload = quotes.filter((ticker) => {
    if(exclude.indexOf(ticker.ticker) === -1){
      return ticker;
    }
  })

  return {
    type: 'ADD_DATA',
    payload
  }
}

export const initData = () => {
  return (dispatch) => {
    listen('connect', () => {
      send('start');
      listen('ticker', (qoutes) => {
        dispatch(addData(qoutes));
      })
    })
    dispatch(getDisabledTickers());
  }
}

export const setDisabledTickers = (quote) => {
  const payload = disablingQuotes(quote);
  
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

export const addTicker = (quote) => {
  const payload = {
    ticker: quote,
    exchange: 'NASDAQ',
    price: "0",
    change: "0",
    change_percent: "0",
    dividend: 0,
    yield: 0,
    last_trade_time: 0,
  }
  return {
    type: 'ADD_TICKER',
    payload
  }
}