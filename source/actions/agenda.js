import * as actionTypes from "../constants/actionTypes";
import * as api from "../constants/api";

export function setAgenda(agenda) {
	return {
		type: actionTypes.AGENDA_SET,
		agenda
	};
}
export function newCategory(category) {
	return {
		type: actionTypes.CATEGORY_ADD,
		category
	};
}
export function newTask(task) {
	return {
		type: actionTypes.TASK_ADD,
		task
	};
}
export function setTask(task) {
	return {
		type: actionTypes.TASK_UPDATE,
		task
	};
}
export function addCategory(name, agenda_id) {
	return (dispatch => {
		fetch(`${api.APIROOT}/category/new/${agenda_id}`, {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ category: name }),
			mode: "cors"
		}).then((response) => response.json()).then((category) => {
			if (category.error) {
				//console.log(`addCategory failed: ${category.error}`);
				return;
			}
			dispatch(newCategory(category));
		});
	}).bind(this);
}
export function addTask(name, category_id) {
	return (dispatch => {
		fetch(`${api.APIROOT}/task/new/${category_id}`, {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ task: name }),
			mode: "cors"
		}).then((response) => response.json()).then((task) => {
			if (task.error) {
				//console.log(`addTask failed: ${task.error}`);
				return;
			}
			dispatch(newTask(task));
		});
	}).bind(this);
}
export function updateTask(task, updates) {
	return (dispatch => {
		task = {...task, ...updates };
		fetch(api.APIROOT + `/task/${task.task_id}`, {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ task }),
			mode: "cors"
		}).then((response) => response.json()).then((task) => {
			dispatch(setTask(task));
		});
	}).bind(this);
}