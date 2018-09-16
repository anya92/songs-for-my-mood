import 'babel-polyfill';
import React from 'react';
import { hydrate } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import axios from 'axios';
import { ThemeProvider } from 'styled-components';

import App from './components/App';

import reducers from './reducers';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const initialState = window.INITIAL_STATE;

delete window.INITIAL_STATE;

const axiosInstance = axios.create({
  baseURL: '/',
});

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(axiosInstance))),
);

const theme = {
  main: '#34ace0',
  light: '#f7f1e3',
};

hydrate(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
