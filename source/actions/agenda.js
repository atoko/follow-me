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

export function setTask(task) {
  return {
    type: actionTypes.TASK_UPDATE,
    task
  };
};


export function addCategory(name, agenda_id)
{
  return (dispatch => {
    fetch(`http://localhost:3000/category/new/${agenda_id}`, {
      method: 'POST',  
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({category: name}),
      mode: 'cors'
    })
      .then((response) => response.json())
      .then((category) => {
        if (category.error)
        {
          console.log(`addCategory failed: ${category.error}`);
          return;
        }
        dispatch(newCategory(category));
      });
  }).bind(this);
}

export function addTask(name, category_id)
{
  return (dispatch => {
    fetch(`http://localhost:3000/task/new/${category_id}`, {
      method: 'POST',  
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({task: name}),
      mode: 'cors'
    })
      .then((response) => response.json())
      .then((task) => {
        if (task.error)
        {
          console.log(`addTask failed: ${task.error}`);
          return;
        }
        dispatch(newTask(task));
      })
  }).bind(this);
}

export function updateTask(task, updates)
{
  task = {...task, ...updates};
  return (dispatch => {
    setTimeout(function() {
      dispatch(setTask(task));
    }, 1);
  }).bind(this);
}