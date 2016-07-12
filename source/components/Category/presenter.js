import React from 'react';
import Task from './../Task';

function djb2(str){
  var hash = 5381;
  for (var i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
  }
  return hash;
}

function hashStringToColor(str) {
  var hash = djb2(str);
  var r = (hash & 0xFF0000) >> 16;
  var g = (hash & 0x00FF00) >> 8;
  var b = hash & 0x0000FF;
  return "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2);
}

function Category({category = {}, doAddTask}) {
	let { tasks } = category;	
	var categoryNameInput = <input className="input is-primary" id={"taskAdd_" + category.category_id} type="text" />;
	var categoryAddButton = 			
		<input className="button is-primary" type="button" value="+" onClick={() => {
				const task = document.getElementById('taskAdd_' + category.category_id);
				doAddTask(task.value, category.category_id)
				task.value = null;
			}
		}/>

	const color = hashStringToColor(category.category);

	return (
		<div>
			<p/>
			<div className="hero">
				<div className="hero-body ">
				<a href='#mapDiv'> <div style={{
					backgroundColor:color,
					height:'20px',
					marginBottom: '4px'}}></div>
				</a>
					<div className="container">
						<h2 className = "title">{category.category}
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
