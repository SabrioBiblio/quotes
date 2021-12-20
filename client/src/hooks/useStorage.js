export const useStorage = () => {

  const setStorage = (item, data, overwrite = true) => {
    if(overwrite){
      localStorage.setItem(item, JSON.stringify(data));
    }else{
      const oldStorage = JSON.parse(localStorage.getItem(item)) || [];
      oldStorage.push(data)
      localStorage.setItem(item, JSON.stringify(oldStorage));
    }
  }

  const getStorage = (item) => {
    if(localStorage.getItem(item) === null){
      setStorage(item, [])
      return localStorage.getItem(item);
    }
    return localStorage.getItem(item);
  }
  

  return [
    setStorage,
    getStorage
  ]
}
