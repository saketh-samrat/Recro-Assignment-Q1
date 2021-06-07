import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './Redux/store';
import App from './App';

ReactDOM.render(
  // Provider component will helps in accessing whole application state
  // and save state vice-versa
  <Provider store={store}>
    <App/>
  </Provider>, document.getElementById('root'));
