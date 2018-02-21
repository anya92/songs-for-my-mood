import express from 'express';

const app = express();

app.use(express.static('public'));

app.get('/api', (req, res) => res.json({ api: 'ok' }));

app.get('*', (req, res) => {
  res.send('SSR REACT');
});

export default app;
