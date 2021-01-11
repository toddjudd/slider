import React, { useState } from 'react';
import './App.less';
import ListPage from './ListPage';
// import { Button, Form } from 'react-bootstrap';
// import Pick from './components/pick/Pick';
// import pickReducer, { initialState } from './components/pick/pickReducer';
// import { PickStateProvider } from './components/pick/pick-state';
//     <PickStateProvider reducer={pickReducer} initialState={initialState}>
//       <Pick />
//     </PickStateProvider>

const App = () => {
  // const [check, setCheck] = useState(true);
  return (
    <div className='App'>
      <ListPage></ListPage>
      {/* <Form.Check
        custom
        type='checkbox'
        id={`custom-checkbox`}
        label={`Check this custom checkbox`}
        checked={check}
        onClick={(e) => {
          setCheck(!check);
        }}
      />
      <Button
        onClick={(e) => {
          setCheck(!check);
        }}>
        check
      </Button> */}
    </div>
  );
};

export default App;
