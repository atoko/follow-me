import * as actionTypes from '../constants/actionTypes';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.AGENDA_SET:
      return setAgenda(state, action);
    case actionTypes.CATEGORY_ADD:
      return addCategory(state, action);
    case actionTypes.TASK_ADD:
      return addTask(state, action);
    case actionTypes.TASK_UPDATE:
      return updateTask(state, action);
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

function addTask(state, action) {
  const { task } = action;
  let category = {};
  state.categories.forEach(function(element) {
    if (element.category_id == task.category_id) 
    {
      element.tasks.push(task);
    }
  }, this);
  
  return { ...state };
}

function updateTask(state, action) {
  const { task } = action;
  let category = {};
  state.categories.forEach(function(category) {
    if (category.category_id == task.category_id)
    {
        category.tasks.forEach(function(t) {
        if (t.task_id == task.task_id)
        {
          category.tasks[category.tasks.indexOf(t)] = task;
        }
      }, this);
    }
  }, this);
  
  return { ...state };
}