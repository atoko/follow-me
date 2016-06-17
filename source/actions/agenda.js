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

export function newTask(task) {
  return {
    type: actionTypes.TASK_ADD,
    task
  };
};


export function addCategory(name, agenda_id)
{
  return (dispatch => {
    setTimeout(function() {
      var category = {
        agenda_id,
        category: name,
        tasks: []
      };        
      category["category_id"] = (new Date()).getTime(); 
      dispatch(newCategory(category));
    }, 1);
  }).bind(this);
}

export function addTask(name, category_id)
{
  return (dispatch => {
    setTimeout(function() {
      var task = {
        category_id,
        task: name
      };        
      task["task_id"] = (new Date()).getTime(); 
      dispatch(newTask(task));
    }, 1);
  }).bind(this);
}