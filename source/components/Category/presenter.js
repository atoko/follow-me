import React from 'react';
import Task from './../Task';

function Category({portal = {}, type_id}) {
	let { portals } = portal;

	const styles = {
		'1': 'SPICYMAYO',
		'2': 'POKESTOP',
		'3': 'GYM',
		'4': 'DORMANT'
	}
	const color = hashStringToColor(styles[type_id]);

	const categories = {
		'1': 'Undetermined',
		'2': 'PokéStop',
		'3': 'Pokémon Gym',
		'4': 'Disabled'
	};
	var i = 0;
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
					<span className = "title"> 
						{categories[type_id]}
						</span>
					</div>
				</div>
			</div>
			
			<div className="columns is-multiline">
				{portal.map((task) => {i = i + 1; return <Task task={task} key={task.name + i} />})	}		
			</div>
		</div>
	)
}

export default Category;
