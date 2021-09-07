import {combineReducers} from 'redux';
// NOTE: No need to name them somethingReducers, we are on the reducers folder
import data from './dataReducers';

export default combineReducers({
  data,
});
