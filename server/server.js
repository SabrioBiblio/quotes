'use strict';
const express = require('express');
const http = require('http');
const io = require('socket.io');
const cors = require('cors');

let FETCH_INTERVAL = 50000;
const PORT = process.env.PORT || 4000;

const tickers = [
  'AAPL', // Apple
  'GOOGL', // Alphabet
  'MSFT', // Microsoft
  'AMZN', // Amazon
  'FB', // Facebook
  'TSLA', // Tesla
];

function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
}

function getQuotes(socket) {
  const quotes = tickers.map(ticker => ({
    ticker,
    exchange: 'NASDAQ',
    price: randomValue(100, 110, 2),
    change: randomValue(50, 65, 2),
    change_percent: randomValue(0, 1, 2),
    dividend: randomValue(0, 1, 2),
    yield: randomValue(0, 2, 2),
    last_trade_time: utcDate(),
  }));
  socket.emit('ticker', quotes);
}

function trackTickers(socket) {
  // run the first time immediately
  getQuotes(socket);

  // every N seconds
  const clearTimer = () => {
    clearInterval(timer);
    getQuotes(socket);
    timer = setInterval(clearTimer, FETCH_INTERVAL);
  }
  let timer = setInterval(clearTimer, FETCH_INTERVAL);

  socket.on('disconnect', function() {
    clearInterval(timer);
  });
}

const app = express();
app.use(cors());
const server = http.createServer(app);
cors
const socketServer = io(server, {
  cors: {
    origin: "*",
  }
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

socketServer.on('connection', (socket) => {
  socket.on('change_interval', (interval) => {
    FETCH_INTERVAL = interval;
  })

  socket.on('start', () => {
    trackTickers(socket);
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
