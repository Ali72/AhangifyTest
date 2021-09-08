import {combineReducers} from 'redux';
// NOTE: No need to name them somethingReducers, we are on the reducers folder
import dataReducer from './dataReducers';

export default combineReducers({
  dataReducer,
});
