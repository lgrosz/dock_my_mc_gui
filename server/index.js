import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';

import MinecraftServer from './MinecraftServer.js';

const app = express();
const server = http.createServer(app);
const mcServer = new MinecraftServer();

const __dirname = dirname(fileURLToPath(import.meta.url));

// serve the front-end
app.use(express.static(path.join(__dirname, '..', 'build')));

app.get('/hello', (_, res) => {
  res.send('Hello from express!');
});

const wss = new WebSocket.Server({ server: server, path: '/console' });

wss.on('connection', (ws) => {
  console.log('Client connected.')
  ws.on('message', msg => {
    switch (msg) {
      case 'start':
        mcServer.start();
        break;
      default:
        mcServer.send(msg);
        break;
    }
  });
});

// start express server on port 5000
// todo get port from environment - actually maybe not since this is meant to be run with docker - maybe put the port in the docker img
const PORT = 8080
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})

