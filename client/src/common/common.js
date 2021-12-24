export const setStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
} 

export const getCurrency = () => {
  return 27;
}

export const getStorage = (key) => {
  if(localStorage.getItem(key) === null){
    setStorage(key, [])
    return JSON.parse(localStorage.getItem(key));
  }
  return JSON.parse(localStorage.getItem(key));
}

export const deletingQuotes = (quote) => {
  const keyStorage = 'exclude_quotes';
  return changeStorage(keyStorage, quote);
}

export const addQuote = (quote) => {
  const keyStorage = 'exclude_quotes';
  return changeStorage(keyStorage, quote);
}

export const disablingQuotes = (quote) => {
  const keyStorage = 'disabled_tickers';
  changeStorage(keyStorage, quote);
}

const changeStorage = (storage, quote) => {
  let quotes = getStorage(storage);
  quotes.includes(quote)
  ?
  quotes.splice(quotes.indexOf(quote), 1)
  :
  quotes.push(quote);
  setStorage(storage, quotes, false);
  return quotes;
}

export const uniqId = (key) => {
  return new Date().getTime() + key
}