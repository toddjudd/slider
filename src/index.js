import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
// import TaskSelector from './components/TaskSelector/TaskSelector';
// import data from './data';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    {/* {data.map((data, i) => (
      <TaskSelector
        key={i}
        carrierTitle={data.carrierTitle}
        maxValue={data.count}></TaskSelector>
    ))} */}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
