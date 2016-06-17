import React from 'react';

function Category({tasks = [], category = ""}) {
	var taskData = <div>--> No tasks!</div>;

	if (tasks.length > 0 && tasks[0] != null)
	{
		taskData = tasks.map((task) => {
			return <div key={task.id}>-  ->{task.task}</div>
		})
	}
	return (
		<div>
			<div> {category} </div>
			{
				taskData
			}
		</div>
	)
}

function Agenda({ agenda = {}, onAdd }) {
	debugger;
	return (
		<div>
		{
			agenda.categories.map((category) => {
				return <Category className="category" key={category.category_id} tasks={category.tasks} category={category.category}/>;
			})
		}
		<input type="button" text=">Add Category" onClick={() => {onAdd("dad", agenda.id)}}/>
		</div>
	);
}

export default Agenda;