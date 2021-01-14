import { useEffect } from 'react';
import { useAuthState } from './auth-state';

export default function useAuth() {
  const [{ authAttempted, auth }, dispatch] = useAuthState();

  useEffect(() => {
    const localAuth = JSON.parse(localStorage.getItem('auth'));
    if (localAuth) {
      dispatch({ type: 'AUTH_CHANGE', auth: localAuth });
    } else {
      dispatch({ type: 'AUTH_CHANGE', auth: null });
    }
  }, [dispatch]);

  return { authAttempted, auth };
}
