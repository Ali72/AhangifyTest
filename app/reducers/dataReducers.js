import {
  GET_BROWSE_DATA,
  GET_NEW_DATA,
  RECEIVE_BROWSE_DATA,
  RECEIVE_NEW_DATA,
} from '../actions/actionTypes';
const dataInitialState = {
  data: null,
  isLoading: true,
};

export default function dataReducer(state = dataInitialState, action) {
  const {payload, type} = action;
  console.log('Reducer =>', action);
  switch (type) {
    case GET_BROWSE_DATA:
    case GET_NEW_DATA:
      return {
        ...state,
        isLoading: true,
      };
    case RECEIVE_NEW_DATA:
    case RECEIVE_BROWSE_DATA:
      return {
        ...state,
        data: payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
