import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import Slider from './Slider';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider, atom } from 'jotai';

const countAtom = atom(1);

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App countAtom={countAtom} />
      <Slider countAtom={countAtom} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
