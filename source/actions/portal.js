import * as actionTypes from "../constants/actionTypes";
import * as api from "../constants/api";

export function setPortals(portals) {
	return {
		type: actionTypes.SET_PORTALS,
		portals
	};
}
export function setPortal(portal) {
	return {
		type: actionTypes.SET_PORTAL,
		portal
	};
}
export function votePortal(portal, vote) {
	return (dispatch => {
		fetch(api.APIROOT + `/portals/vote/${portal.id}/${vote.type_id}`, {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ portal, vote }),
			mode: "cors"
		}).then((response) => response.json()).then((vote) => {
			dispatch(setPortal(vote));
		});
	}).bind(this);
}