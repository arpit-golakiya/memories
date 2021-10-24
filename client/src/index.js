import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Import reducer Index.js
import { reducers } from './reducers';
import App from './App';
import './index.css';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Create Store
const store = createStore(reducers, {}, composeEnhancer(applyMiddleware(thunk)));

ReactDOM.render(
  //  Pass Store to App using Provider
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
