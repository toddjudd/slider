import React from 'react';
import Pick from './Pick';
import pickReducer, { initialState } from './pickReducer';
import { PickStateProvider } from './pick-state';
import './App.less';

const App = () => (
  <div className='App'>
    <PickStateProvider reducer={pickReducer} initialState={initialState}>
      <Pick />
    </PickStateProvider>
  </div>
);

export default App;
