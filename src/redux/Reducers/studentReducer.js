const initState = {
  students: [
    {
      studentError: null,
      requestErrorStudent: null,
      requestErrorCompany: null
    }
  ]
};
const studentReducer = (state = initState, action) => {
  switch (action.type) {
    case 'JOBOFFER_REQUESTED_STUDENT':
      return {
        ...state,
        requestErrorStudent: 'REQUESTED_SUCCESFULLY'
      };
    case 'JOBOFFER_ALREADY_EXISTS_STUDENT':
      return {
        ...state,
        requestErrorStudent: 'ALREADY_EXISTS'
      };
    case 'REQUEST_RESET':
      return {
        ...state,
        requestErrorStudent: null
      };
    case 'JOBOFFER_REQUESTED_COMPANY':
      return {
        ...state,
        requestErrorCompany: 'REQUESTED_SUCCESFULLY'
      };
    case 'JOBOFFER_ALREADY_EXISTS_COMPANY':
      return {
        ...state,
        requestErrorCompany: 'ALREADY_EXISTS'
      };
    case 'REQUEST_RESET_COMPANY':
      return {
        ...state,
        requestErrorCompany: null
      };
    default:
      return state;
  }
};
export default studentReducer;
