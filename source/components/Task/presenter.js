import React from 'react';

class Task extends React.Component
{
	fileUpload(files)
	{
		const file = files.target.files[0];
		const reader = new FileReader();
		const data = reader.readAsDataURL(file);
		reader.onload = function(event) 
		{
			this.props.updateTask(this.props.task, {image: event.currentTarget.result});
			//const img = document.getElementById("taskImg_" + task.task_id);
			//img.src = event.currentTarget.result;
			//console.log(img);
		}.bind(this);
	}
	addressUpload()
	{
		const address = document.getElementById('taskAddLoc_' + this.props.task.task_id).value;
		const geocoder = new google.maps.Geocoder();
		const request = {
			address
		};

		geocoder.geocode(request, function(c, cb) {
			if (cb == "OK")
			{
				const location = c[0].geometry.location;
				this.props.updateTask(this.props.task, {location: {lat: location.lat(), lng: location.lng()}});
			}
		}.bind(this));
	}
	render() 
	{
		const task = this.props.task;
		var html = <div>--> No tasks!</div>;

		if (task != null)
		{
			const image = (task.image != null) ? 
				<img src={task.image}/> : 
				<input type="file" onChange={(f) => {this.fileUpload(f);}}/>;

			const location = (task.location != null) ?
					<div>{JSON.stringify(task.location)}</div> :
					<div>
						<input id={"taskAddLoc_" + task.task_id}/>
						<input type="button" value="Add location" onClick={() => this.addressUpload()}/> 
					</div>;
			html = 
				<div>-->{task.task}
					{image}
					{location}
				</div>;
		}
		return html;
	}
}

export default Task;
