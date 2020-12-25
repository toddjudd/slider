import React from 'react';
import ReactDOM from 'react-dom';
import TaskSelector from './components/TaskSelector/TaskSelector';
import data from './data';

ReactDOM.render(
  <React.StrictMode>
    {data.map((data, i) => (
      <TaskSelector
        key={i}
        carrierTitle={data.carrierTitle}
        maxValue={data.count}></TaskSelector>
    ))}
  </React.StrictMode>,
  document.getElementById('root')
);
