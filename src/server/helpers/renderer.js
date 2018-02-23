import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { ServerStyleSheet } from 'styled-components';
import serialize from 'serialize-javascript';

import App from '../../client/components/App';

export default (req, store) => {
  const sheet = new ServerStyleSheet();
  const content = renderToString(sheet.collectStyles(<Provider store={store}><App /></Provider>));
  const styleTags = sheet.getStyleTags();
  // console.log('store', store.getState());

  return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My App</title>
        <link rel="stylesheet" href="https://unpkg.com/modern-normalize@0.4.0/modern-normalize.css">
        <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,600,700|Lato:300,400,700" rel="stylesheet">
        ${styleTags}
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;
};
