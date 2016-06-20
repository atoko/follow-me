import React from 'react';
import Category from './../Category';
import GoogleMap from 'google-map-react';

function Agenda({ agenda = {}, doAddCategory, doAddTask }) {
	var categoryNameInput = <input />;
	const center = {lat:59, lng:33};
	return (
		<div>
			<div>
				{
					agenda.categories.map((category) => {
						return <Category doAddTask={doAddTask} className="category" key={category.category_id} category={category}/>;
					})
				}
				{categoryNameInput}
				
				<input type="button" value=">Add Category" onClick={() => {categoryNameInput = 0; doAddCategory("dad", agenda.agenda_id)}}/>
			</div>
			<div style={{height:"300px"}}>
				<GoogleMap
					bootstrapURLKeys={{key: "AIzaSyC44lwcJ4H7tARXpxg64qsFZeU258jKJJw"}}
					center={center}
					zoom={9}>
					<div style={{height:"200px"}} lat={59.955413} lng={30.337844}>
						A marker!
					</div>
				</GoogleMap>
			</div>
		</div>
	);
}

export default Agenda;