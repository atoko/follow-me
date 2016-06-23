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
					<div>{JSON.stringify(task.location)}</div> :
					<div className="control">
						<input className = "input is-success" id={"taskAddLoc_" + task.task_id} type="text"/>
						<input className = "button is-success" type="button" value="Add location" onClick={() => this.addressUpload()}/> 
					</div>;
			html = 
<div className="card column is-one-third">
  <div className="card-image">
    <figure className="image is-4by3">
      {image}
    </figure>
  </div>
  <div className="card-content">
    <div className="media">
      <div className="media-left">
        <figure className="image is-32x32">
          <img src="http://placehold.it/64x64" alt="Image" />
        </figure>
      </div>
      <div className="media-content">
        <p className="title is-5">{task.task}</p>
        <p className="subtitle is-6">{location}</p>
      </div>
    </div>

    <div className="content">
      <small>11:09 PM - 1 Jan 2016</small>
    </div>
  </div>
</div>;
		}
		return html;
	}
}

export default Task;
