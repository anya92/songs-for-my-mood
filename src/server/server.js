import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import router from './routes';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import { fetchCurrentUser } from '../client/actions';

const app = express();
const MongoStore = require('connect-mongo')(session);

app.use(cors());
app.use(express.static('public'));

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.on('error', error => console.log('database error', error));
mongoose.Promise = global.Promise;

require('./models/User');
require('./passport.js');

app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
  }),
}));

app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

app.get('/api', (req, res) => res.json({ api: 'ok' }));

app.get('*', (req, res) => {
  const store = createStore(req);

  const promises = [store.dispatch(fetchCurrentUser())];

  const render = () => {
    // const context = {};
    const content = renderer(req, store);

    res.send(content);
  };

  Promise.all(promises)
    .then(render)
    .catch(render);
});

export default app;
