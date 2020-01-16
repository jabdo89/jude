const initState = {
  auth: [
    {
      authError: null
    }
  ]
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SIGNIN_SUCCESS':
      return {
        ...state,
        authError: null
      };
    case 'SIGNIN_ERROR':
      return {
        ...state,
        authError: action.error.message
      };
    case 'SIGNUP_ERROR':
      return {
        ...state,
        authError: action.error.message
      };
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        authError: 'Sign Up Sucess'
      };
    case 'USER_ALREADY_EXISTS':
      return {
        ...state,
        authError: 'User already exist, please log in'
      };
    default:
      return state;
  }
};
export default authReducer;
