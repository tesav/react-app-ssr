import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducers from './reducers';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';

const store = createStore(reducers, { ...window.__STATE__ });

ReactDOM.hydrate(
  <BrowserRouter>
    <App store={store} />
  </BrowserRouter>,
  document.getElementById('root')
);
