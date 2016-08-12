import * as actionTypes from "../constants/actionTypes";
export function setFilter(filter) {
	var command = {
		type_id: filter.target.value
	};
	return {
		type: actionTypes.SET_FILTER,
		command
	};
}
export function setCenter(center) {
	return {
		type: actionTypes.SET_CENTER,
		center
	};
}
export function setDistance(distance) {
	var command = {
		distance: distance.target.value
	};
	return {
		type: actionTypes.SET_DISTANCE,
		command
	};
}
export function setSelected(command) {
	return {
		type: actionTypes.PORTAL_SELECT,
		command
	};
}