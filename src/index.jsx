import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import { rootReducer } from './services/reducers';
import thunk from 'redux-thunk';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
const store = createStore(rootReducer, applyMiddleware(thunk));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
