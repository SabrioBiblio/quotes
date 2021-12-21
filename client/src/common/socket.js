import { io } from "socket.io-client";

const socket = io('localhost:4000')

export const listen = (event, callback) => {
  socket.on(event, callback);
}

export const send = (event, data) => {
  socket.emit(event, data);
}

export const changeInterval = (data) => {
  send('change_interval', data);
}

export const getDeletedQuotes = () => {
  socket.emit('get_deleted_quotes');
  return new Promise((resolve, reject) => {
    socket.on('send_deleted_quotes', (data) => resolve(data))
  }).then(data => data)
}