import React from 'react';
import { connect } from 'react-redux';

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

function Agenda({ agenda = {} }) {
	return (
		<div>
		{
			agenda.categories.map((category) => {
				return <Category className="category" key={category.category_id} tasks={category.tasks} category={category.category}/>;
			})
		}
		</div>
	);
}

function mapStateToProps(state) {
  const agenda = state.agenda[0];
  return {
    agenda
  }
}

export default connect(mapStateToProps)(Agenda);