import * as actionTypes from '../constants/actionTypes';
import geo from 'geolib';

const initialState = { 
  portals: [], 
  filters: {1 : true, 2 : true, 3 : true, 4 : false},
  center: {"lat":18.2988,"lng":-66.0352},
  origin: {"lat":18.2988 ,"lng":-66.0352},
  distance: 1500,
  filtered: [],
  selected: [],
  selectedIds: [],  
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_PORTALS:
    	return setPortals(state, action);
	  case actionTypes.SET_PORTAL:
		  return setPortal(state, action);
    case actionTypes.SET_FILTER:
    	return setFilter(state, action);
    case actionTypes.SET_CENTER:
      return setCenter(state, action);
    case actionTypes.SET_DISTANCE:
      return setDistance(state, action);
    case actionTypes.PORTAL_SELECT:
      return setSelected(state, action);
  }
  return state;
}

function processPortals(portals, center, selected)
{
  var select = [];
  portals.forEach((p) => { 
    p.distance = geo.getDistance(center, p); 
    var refresh = selected.filter((ps) => { return p.id == ps.id; });
    if (refresh.length > 0)
    {
      select.push(p);
    } 
    p.selected = select.indexOf(p) != -1;
  });
}
function filterPortals(state, newPortals)
{
  var portals = typeof(state.portals.filter) != "undefined" ? state.portals : newPortals;
  portals = newPortals || portals;
  var filtered = portals.filter((p) => { return state.filters[p.type_id] == true && p.distance < state.distance});

  filtered = filtered.sort((a, b) => { return a.distance - b.distance; });

  return filtered;
}

function setPortal(state, action) {
  const { portal } = action;
  var filtered = [];

  var p = state.portals.filter(function(p) { return p.id == portal.portal_id; })  
  if (p.length > 0)
  {
    var updated = { ...p[0] };
    updated.vote = portal;

    state.portals[state.portals.indexOf(p[0])] = updated;

    if (typeof(state.portals.map) == "function")
    {
      processPortals(state.portals, state.center, state.selected);
      filtered = filterPortals(state);
    }     
  }
  
  return { ...state, filtered };  
}


function setPortals(state, action) {
  var { portals } = action;
  var filtered = [];
  
  if (typeof(portals.map) == "function")
  {
      processPortals(portals, state.center, state.selected);
      filtered = filterPortals(state, portals);
  }
  return { ...state, portals, filtered };
}

function setFilter(state, action)
{
  var { portals, filtered } = state;
  state.filters[action.command.type_id] = !state.filters[action.command.type_id]; 

  if (typeof(state.portals.filter) == "function")
  {
    processPortals(portals, state.center, state.selected);
    filtered = filterPortals(state);    
  }
	return { ...state, filtered };
}

function setCenter(state, action)
{
  const { center } = action;
  var { portals, filtered } = state;
  var origin;
  if (typeof(portals.map) == "function")
  {
      processPortals(portals, center, state.selected);
      filtered = filterPortals(state);
      origin = state.origin;
      if (action.center.setOrigin)
      {
        origin = center;
      }
  }  
  return { ...state, center, filtered, portals, origin };
}

function setDistance(state, action)
{
  const { command } = action;
  var { portals, filtered, center } = state;

  if (typeof(portals.map) == "function")
  {
      processPortals(portals, center, state.selected);
      filtered = filterPortals(state);    
  }  
  return { ...state, distance: command.distance, filtered, portals };
}

function setSelected(state, action)
{
  const { command } = action;
  var { portals, filtered, center, selected } = state;

  if (typeof(portals.map) == "function")
  {
      if (command.selected)
      {
        selected.push(command.portal);
      }
      else
      {
        selected = selected.filter(function(p){return p.id !== command.portal.id})        
      }
      processPortals(portals, center, selected);
      filtered = filterPortals(state);    
  }  
  return { ...state, filtered, portals, selected };
}