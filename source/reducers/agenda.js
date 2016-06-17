import * as actionTypes from '../constants/actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.AGENDA_SET:
      return setAgenda(state, action);
    case actionTypes.CATEGORY_ADD:
      return addCategory(state, action);
  }
  return state;
}

function setAgenda(state, action) {
  const { agenda } = action;
  return { ...state, ...agenda };
}

function addCategory(state, action) {
  const { category } = action;
  state.categories = [ ...state.categories, category];
  return { ...state };
}
