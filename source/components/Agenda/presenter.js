import React from 'react';
import Category from './../Category';
import GoogleMap from 'google-map-react';

function Agenda({ agenda = {}, doAddCategory, doAddTask }) {
	let categoryNameInput = <input />;
	const center = {"lat":40.7780464,"lng":-73.97867859999997};
	
	if (agenda.agenda_id == null)
	{
		return <div> Loading.. </div>
	}

	const mapTasks = agenda.categories
		.map((category) => {
			return category.tasks;
		})
		.reduce( (previous, current) => { 
			return previous.concat(current)
		}, [])
		.filter((task) => task != null && task.location != null)
		.map((task) => {
			return <div key={task.task_id} lat={task.location.lat} lng={task.location.lng}
			style={{width:"20px", height:"20px", background:"red"}}>
				{task.task}
			</div>			
		});

	const map = <div style={{height:"500px"}}>
				<GoogleMap
					bootstrapURLKeys={{key: "AIzaSyC44lwcJ4H7tARXpxg64qsFZeU258jKJJw"}}
					center={center}
					zoom={13}>
					{mapTasks}
				</GoogleMap>
			</div>
	const onAddClick = () => {
		const category = document.getElementById('catAdd_' + agenda.agenda_id);
		doAddCategory(category.value, agenda.agenda_id)
		category.value = null;
	};

	return (
		<div>
			<div>
				<div className="container box level">

					<span className="title level-left">
						NYC
					</span>				
					<span className="control has-addons level-right">
						<input className = "input is-warning" id={'catAdd_' + agenda.agenda_id} type="text"/>
						<input className = "button is-warning" type="button" value="New Category" onClick={onAddClick}/>
					</span>	
				</div>
				{map}
				{
					agenda.categories.map((category) => {
						return <Category doAddTask={doAddTask} key={category.category_id} category={category}/>;
					})
				}
			</div>
		</div>
	);
}

export default Agenda;