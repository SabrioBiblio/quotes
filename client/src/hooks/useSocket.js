import { io } from 'socket.io-client'

export const useSocket = () => {
  const socket = io('localhost:4000');

  const listen = (event, callback) => {
    socket.on(event, callback)
  }

  const send = (event, data) => {
    socket.emit(event, data)
  }

  const listenOnce = (event, data) => {
    socket.once(event, data)
  }

  return [
    listen,
    send,
    listenOnce
  ]
}
