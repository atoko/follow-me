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
			this.props.updateTask(this.props.task, {file_id: event.currentTarget.result});
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
			const image = (task.file_id != null) ? 
				<img src={task.file_id}/> : 
				<input type="file" onChange={(f) => {this.fileUpload(f);}}/>;

			const location = (task.location != null) ?
					<div>{""}</div> :
					<div className="control has-addons">
						<input className = "input is-success" id={"taskAddLoc_" + task.task_id} type="text"/>
						<input className = "button is-success" type="button" value="Add location" onClick={() => this.addressUpload()}/> 
					</div>;
			const googleString = `http://www.google.com/?q=${task.task.replace(' ', '+')}`;
			html = 
<div className="card column is-one-third" id={task.task_id}>
  <div className="card-content">
    <div className="media">
      <div className="media-content">
        <a href={googleString} target="_blank" className="title is-5">{task.task}</a>
        <p className="subtitle is-2">{location}</p>
      </div>
    </div>
  </div>
</div>;
		}
		return html;
	}
}

export default Task;
