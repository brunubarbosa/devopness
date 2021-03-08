import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/Main';
import { GlobalProvider } from "./context/Provider";
ReactDOM.render(
  <GlobalProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GlobalProvider>,
  document.getElementById('root')
);

