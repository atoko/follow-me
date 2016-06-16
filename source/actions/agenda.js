import * as actionTypes from '../constants/actionTypes';

export function setAgenda(agenda) {
  return {
    type: actionTypes.AGENDA_SET,
    agenda
  };
};