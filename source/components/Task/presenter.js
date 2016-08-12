import React from "react";
class Task extends React.Component {
	addressUpload() {
		const address = document.getElementById("taskAddLoc_" + this.props.task.task_id).value;
		const geocoder = new google.maps.Geocoder();
		const request = {
			address
		};
		geocoder.geocode(request, function(c, cb) {
			if (cb == "OK") {
				const location = c[0].geometry.location;
				this.props.updateTask(this.props.task, { location: { lat: location.lat(), lng: location.lng() } });
			}
		}.bind(this));
	}
	vote(event) {
		this.props.votePortal(this.props.task, { type_id: event.target.value });
	}
	render() {
		const task = this.props.task;
		var html = <div>--> No tasks!</div>;
		if (task != null) {
			const getImage = function(type_id) {
				switch (type_id) {
				case 1:
					return "un";
				case 2:
					return "pokestop";
				case 3:
					return "gym";
				case 4:
					return "disabled";
				}
			};
			html = <div className="" id={task.name}>
	<div style={{overflow:"hidden", marginBottom: "10px"}} className="card is-fullwidth">
		<header className={"card-header " + getImage(task.type_id)}>
			<p className="card-header-title">
				{task.name}
			</p>
			<div className="image is-24x24 is-hidden-tablet">
				<img className="is-32x32"  src={`/assets/m/${getImage(task.type_id)}.png`}/>			
			</div>			
			<span className="tag is-dark is-small">{task.distance}m</span>
			<div  className="is-24x24 is-hidden-mobile">
				<img className="image is-32x32" src={`/assets/m/${getImage(task.type_id)}.png`}/>			
			</div>
		</header>

	</div>			
</div>;
		}
		return html;
	}
}
export default Task;