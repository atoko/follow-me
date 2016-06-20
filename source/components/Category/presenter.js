import React from 'react';
import Task from './../Task';

function Category({category = {}, doAddTask}) {
	let { tasks } = category;	
	var categoryNameInput = <input id={"catAdd_" + category.category_id} />;
	var categoryAddButton = 			
		<input type="button" value=">Add Task" onClick={() => {
				const task = document.getElementById('catAdd_' + category.category_id).value;
				doAddTask(task, category.category_id)
			}
		}/>
	return (
		<div>
			<p/>
			<div> {category.category} </div>
			{tasks.map((task) => {return <Task task={task} key={task.task_id} />})	}		
			{categoryNameInput}
			{categoryAddButton}
		</div>
	)
}

export default Category;
