import express from 'express';
import renderer from './helpers/renderer';

const app = express();

app.use(express.static('public'));

app.get('/api', (req, res) => res.json({ api: 'ok' }));

app.get('/', (req, res) => {
  const content = renderer(req);
  
  res.send(content);
});

export default app;
