import { io } from "socket.io-client";

const socket = io('localhost:4000')

export const listen = (event, callback) => {
  socket.on(event, callback);
}

export const send = (event, data) => {
  socket.emit(event, data);
}

export const setIntervalQuotes = (value) => {
  send('change_interval', value)
}
