import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';

import App  from '../../client/components/App';

export default (req, store) => {
  const content = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  return `
    <html>
      <body>
        <div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;
}
