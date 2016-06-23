import React from 'react';
import Task from './../Task';

function Category({category = {}, doAddTask}) {
	let { tasks } = category;	
	var categoryNameInput = <input className="input is-primary" id={"taskAdd_" + category.category_id} type="text" />;
	var categoryAddButton = 			
		<input className="button is-primary" type="button" value="New Task" onClick={() => {
				const task = document.getElementById('taskAdd_' + category.category_id);
				doAddTask(task.value, category.category_id)
				task.value = null;
			}
		}/>
	return (
		<div>
			<p/>
			<div className="hero">
				<div className="hero-body">
					<div className="container">
						<h2 className = "title">Category: {category.category}
							<span className="control has-addons is-pulled-right">
								{categoryNameInput}
								{categoryAddButton}
							</span>
						</h2>
					</div>
				</div>
			</div>
			<div className="columns is-multiline">
				{tasks.map((task) => {return <Task task={task} key={task.task_id} />})	}		
			</div>
		</div>
	)
}

export default Category;
