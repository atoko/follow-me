import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import agenda from './agenda';

export default combineReducers({
  agenda,
  routing: routerReducer
});