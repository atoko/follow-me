import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import agenda from './agenda';
import portal from './portal';

export default combineReducers({
  agenda,
  portal,
  routing: routerReducer
});