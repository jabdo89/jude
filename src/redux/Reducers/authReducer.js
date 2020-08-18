const initState = {
  auth: [
    {
      authError: null,
      companyChangePassword: null,
      forgotPasswordError: null
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
        authError: action.err.message
      };
    case 'SIGNUP_ERROR':
      return {
        ...state,
        authError: action.err.message
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
    case 'COMPANY_PASSWORD_CHANGE':
      return {
        ...state,
        companyChangePassword: 'Company Password Changed Succesfully'
      };
    case 'COMPANY_PASSWORD_ERR':
      return {
        ...state,
        companyChangePassword: 'Company Password Error'
      };
    case 'COMPANY_PASSWORD_RESET':
      return {
        ...state,
        companyChangePassword: null
      };
    case 'FORGOT_PASSWORD_SENT':
      return {
        ...state,
        forgotPasswordError: 'Change Password Email Sent Succesfully!'
      };
    case 'FORGOT_PASSWORD_ERR':
      return {
        ...state,
        forgotPasswordError: action.err.message
      };
    default:
      return state;
  }
};
export default authReducer;
