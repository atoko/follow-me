import React from 'react';

function Category({tasks = [], category = ""}) {
	var taskData = <div>--> No tasks!</div>;

	if (tasks.length > 0 && tasks[0] != null)
	{
		taskData = tasks.map((task) => {
			return <div key={task.id}>-->{task.task}</div>
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

function Agenda({ categories = [] }) {
	return (
		<div>
		{
			categories.map((category) => {
				return <Category className="category" key={category.category_id} tasks={category.tasks} category={category.category}/>;
			})
		}
		</div>
	);
}

export default Agenda;