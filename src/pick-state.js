import { createContext, useReducer, useContext } from 'react';

const Context = createContext();

export function PickStateProvider({ reducer, initialState = {}, children }) {
  // creates a reducer [state, reducer]
  const value = useReducer(reducer, initialState);
  //sets the initial value of the context equal to the reducer.
  return <Context.Provider value={value} children={children} />;
}

export function usePickState() {
  return useContext(Context);
}
