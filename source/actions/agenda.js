import * as actionTypes from '../constants/actionTypes';

export function setAgenda(agenda) {
  return {
    type: actionTypes.AGENDA_SET,
    agenda
  };
};

export function newCategory(category) {
  return {
    type: actionTypes.CATEGORY_ADD,
    category
  };
};

export function addCategory(name, agenda_id)
{
  return (dispatch => {
    var category = {
      agenda_id,
      category: name,
      tasks: []
    };  

    setTimeout(function() {
      category["category_id"] = (new Date()).getTime(); 
      dispatch(newCategory(category));
    }, 500);
  }).bind(this);
}

export function addTask(name, category_id)
{
  return (dispatch => {
    var category = {
      agenda_id,
      category: name,
      tasks: []
    };  

    setTimeout(function() {
      category["category_id"] = (new Date()).getTime(); 
      dispatch(newCategory(category));
    }, 500);
  }).bind(this);
}