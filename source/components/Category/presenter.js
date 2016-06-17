import React from 'react';

function Category({category = {}, doAddTask}) {
	let { tasks } = category;
	var taskData = <div>--> No tasks!</div>;

	if (tasks.length > 0 && tasks[0] != null)
	{
		taskData = tasks.map((task) => {
			return <div key={task.task_id}>-  ->{task.task}</div>
		})
	}
	return (
		<div>
			<p/>
			<div> {category.category} </div>
			{
				taskData
			}		
			<input type="button" value=">Add Task" onClick={() => {doAddTask("dad", category.category_id)}}/>
		</div>
	)
}

export default Category;
