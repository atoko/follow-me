import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import portal from "./portal";
export default combineReducers({
	portal,
	routing: routerReducer
});