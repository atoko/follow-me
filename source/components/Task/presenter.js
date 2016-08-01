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
	vote(event)
	{
		this.props.votePortal(this.props.task, {type_id: event.target.value});
	}
	render() 
	{
		const task = this.props.task;
		var html = <div>--> No tasks!</div>;

		if (task != null)
		{
			var buttonClass = function(value)
			{
				const css = "button is-fullwidth ";
				const selected = (task.vote && (value == task.vote.type_id)) ? "is-primary" : "";
				return css + selected;
			}

			const getImage = function(type_id)
			{
				switch (type_id) {
					case 1:
						return 'un';
					case 2:
						return 'pokestop';
					case 3:
						return 'gym';
					case 4:
						return 'disabled';
				}
			}

			var votePanel = 		<div className="card-footer"> 
			<button className={buttonClass(2)} onClick={this.vote.bind(this)} value="2">
				<div className="image is-24x24">
					<img className="is-32x32"  src={`/assets/m/pokestop.png`}  value="2"/>			
				</div>					
			</button>
			<button className={buttonClass(3)} onClick={this.vote.bind(this)} value="3">
				<div className="image is-24x24">
					<img className="is-32x32"  src={`/assets/m/gym.png`}  value="3"/>			
				</div>					
			</button>
			<button className={buttonClass(4)} onClick={this.vote.bind(this)} value="4"><span className="fa fa-ban"  value="4"> </span></button>
		</div>;
			html = 
<div className="" id={task.name}>
	<div style={{overflow:'hidden', marginBottom: '10px'}} className="card is-fullwidth">
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
