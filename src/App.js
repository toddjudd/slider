import React from 'react';
import './App.less';
import Login from './Login';
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
      <Login></Login>
      {/* <ListPage></ListPage> */}
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
