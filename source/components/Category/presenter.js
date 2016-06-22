import React from 'react';
import Task from './../Task';

function Category({category = {}, doAddTask}) {
	let { tasks } = category;	
	var categoryNameInput = <input id={"taskAdd_" + category.category_id} type="text" />;
	var categoryAddButton = 			
		<input type="button" value=">Add Task" onClick={() => {
				const task = document.getElementById('taskAdd_' + category.category_id);
				doAddTask(task.value, category.category_id)
				task.value = null;
			}
		}/>
	return (
		<div>
			<p/>
			<div>Category: {category.category} </div>
			{tasks.map((task) => {return <Task task={task} key={task.task_id} />})	}		
			{categoryNameInput}
			{categoryAddButton}
		</div>
	)
}

export default Category;
