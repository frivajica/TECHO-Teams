import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./state/store";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);