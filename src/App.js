import React from 'react';
import './App.less';
import { AuthStateProvider } from './auth-state';
import authReducer, { initialState } from './authReducer';
import useAuth from './useAuth';
import Login from './Login';
import LoggedIn from './LoggedIn';

const Auth = () => {
  //use app state return state,
  const { authAttempted, auth } = useAuth();

  //try to login from local storage, untill that's attempted show nothing/spinner
  if (!authAttempted) return null;

  return auth ? <LoggedIn /> : <Login />;
};

const App = () => {
  return (
    <AuthStateProvider reducer={authReducer} initialState={initialState}>
      <Auth></Auth>
    </AuthStateProvider>
  );
};

export default App;
