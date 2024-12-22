import WebSocket from 'ws';
import { DataItem } from '../src/app/shared/data.models';

const wss = new WebSocket.Server({ port: 9000 });

wss.on('connection', (ws: WebSocket) => {
  console.info('New client connected');

  const interval = setInterval(() => {
    const data: DataItem[] = Array.from({ length: 1000 }).map((_, index) => ({
      name: `Name ${index + 1}`,
      value: Math.round(Math.random() * 100000000),
    }));

    ws.send(JSON.stringify(data));
  }, 250);

  ws.on('close', () => {
    console.log('Client getrennt.');
    clearInterval(interval);
  });
});
