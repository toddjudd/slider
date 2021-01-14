import { createContext, useReducer, useContext } from 'react';

const AuthContext = createContext();

export function AuthStateProvider({ reducer, initialState = {}, children }) {
  // creates a reducer [state, reducer]
  const value = useReducer(reducer, initialState);
  //sets the initial value of the context equal to the reducer.
  return <AuthContext.Provider value={value} children={children} />;
}

export function useAuthState() {
  return useContext(AuthContext);
}
