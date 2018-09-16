import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { ServerStyleSheet, ThemeProvider } from 'styled-components';
import serialize from 'serialize-javascript';

import App from '../../client/components/App';

export default (req, store) => {
  const theme = {
    main: '#34ace0',
    light: '#f7f1e3',
  };

  const sheet = new ServerStyleSheet();
  const content = renderToString(sheet.collectStyles(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>,
  ));
  const styleTags = sheet.getStyleTags();

  return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>songs for my mood</title>
        <link rel="stylesheet" href="https://unpkg.com/modern-normalize@0.4.0/modern-normalize.css">
        <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,600|Gochi+Hand" rel="stylesheet">
        ${styleTags}
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src="/main.js"></script>
        <script src="/vendors.js"></script>
      </body>
    </html>
  `;
};
