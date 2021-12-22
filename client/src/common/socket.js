import { io } from "socket.io-client";

const socket = io('localhost:4000')

export const listen = (event, callback) => {
  socket.on(event, callback);
}

export const send = (event, data) => {
  socket.emit(event, data);
}

export const addQuote = (ticker) => {
  send('add_quote', ticker)
}

export const changeInterval = (data) => {
  send('change_interval', data);
}