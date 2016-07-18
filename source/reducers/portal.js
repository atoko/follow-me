import * as actionTypes from '../constants/actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_PORTALS:
    	return setPortals(state, action);
	case actionTypes.SET_PORTAL:
		return setPortal(state, action);
  }
  return state;
}

function setPortals(state, action) {
  const { portals } = action;
  return { ...state, portals };
}

function setPortal(state, action) {
  const { portal } = action;

  var p = state.portals.filter(function(p) { return p.id == portal.portal_id; })  
  if (p.length > 0)
  {
    var updated = { ...p[0] };
    updated.vote = portal;

    state.portals[state.portals.indexOf(p[0])] = updated;
  }
  
  return { ...state };  
}
