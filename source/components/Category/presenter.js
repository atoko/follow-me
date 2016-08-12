import React from "react";
import Task from "./../Task";

function Category({ portal = {}, type_id }) {
	const categories = {
		"0": "Nearby",
		"1": "Selected",
		"2": "PokéStop",
		"3": "Pokémon Gym",
		"4": "Disabled"
	};
	var portalCollection = <span />;
	if (portal.map !== undefined) {
		portalCollection = portal.map((task) => {
			return <Task task={task} key={task.name} />; });
		if (portal.length == 0) {
			portalCollection = <article style={{marginTop: "8px"}} className="message is-warning">
									<div className="message-header">
										No data found.
									</div>
									<div className="message-body">
										There's nothing here!
									</div>
								</article>;
		}
	}
	return (<div style={{}} class="box">
			<hr/>
			<div className={"hero" }>
				<div className=""> 
					<div className="container">
					<br />
						<h1 className = "title"> 
							{categories[type_id]}
						</h1>
					</div>
				</div>
				<div style={{
					marginBottom: "4px"}} />
			</div>
			
			<div className="is-multiline">
				{portalCollection}		
			</div>
		</div>);
}
export default Category;