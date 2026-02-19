import {GlobalStyles} from 'components/shared/styled';
import React from 'react';
import ReactDOM from 'react-dom';
import {CurrentTheme} from 'theme';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <CurrentTheme>
      <GlobalStyles />
      <App />
    </CurrentTheme>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
