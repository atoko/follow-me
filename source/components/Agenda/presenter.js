import React from 'react';
import Category from './../Category';

function Agenda({ agenda = {}, doAddCategory, doAddTask }) {
	return (
		<div>
		{
			agenda.categories.map((category) => {
				return <Category doAddTask={doAddTask} className="category" key={category.category_id} category={category}/>;
			})
		}
		<input type="button" value=">Add Category" onClick={() => {doAddCategory("dad", agenda.agenda_id)}}/>
		</div>
	);
}

export default Agenda;