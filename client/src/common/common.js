export const setStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
} 

export const getStorage = (key) => {
  if(localStorage.getItem(key) === null){
    setStorage(key, [])
    return JSON.parse(localStorage.getItem(key));
  }
  return JSON.parse(localStorage.getItem(key));
}

export const actionTicker = (key, quote) => {
  let quotes = getStorage(key);
  quotes.includes(quote)
  ?
  quotes.splice(quotes.indexOf(quote), 1)
  :
  quotes.push(quote);
  setStorage(key, quotes, false);
  console.log(quotes)
  return quotes;
}

export const uniqId = (key) => {
  return new Date().getTime() + key
}