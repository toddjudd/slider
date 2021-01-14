const initialState = { authAttempted: false, auth: null };

const authStateReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_CHANGE': {
      localStorage.setItem('auth', JSON.stringify(action.auth));
      return { ...state, auth: action.auth, authAttempted: true };
    }
    default:
      return state;
  }
};

export { initialState };
export default authStateReducer;
