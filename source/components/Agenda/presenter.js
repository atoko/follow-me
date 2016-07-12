import React from 'react';
import Category from './../Category';
import GoogleMap from 'google-map-react';

function hashStringToColor(str) {
  var hash = 5381;
  for (var i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
  }
  var r = (hash & 0xFF0000) >> 16;
  var g = (hash & 0x00FF00) >> 8;
  var b = hash & 0x0000FF;
  return "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2);
}

function Agenda({ agenda = {}, doAddCategory, doAddTask }) {
	let categoryNameInput = <input />;
	const center = {"lat":40.7780464,"lng":-73.97867859999997};
	
	if (agenda.agenda_id == null)
	{
		return <div> Loading.. </div>
	}

	const boxStyle = function(category) {
		return {
			borderRadius:"4px", 
			width: '8px',
			height: '8px',
			backgroundColor:hashStringToColor(category), 
			border:"solid" + hashStringToColor(category),
			marginTop:"-14px",
			marginLeft:"-14px",
			whiteSpace: 'nowrap'
		}
	};

	const textStyle = {
		marginLeft:"3px",
		fontWeight: 'bold',
		fontSize:12,
		textShadow: "-1px -1px 0 #000,    1px -1px 0 #000,    -1px 1px 0 #000,     1px 1px 0 #000",
		color:'#F2f2F8'};

	const onMapClick = (task_id) =>
	{
		document.getElementById(task_id).scrollIntoView();		
	}

	const mapTasks = agenda.categories
		.map((category) => {
			return category.tasks.map((task) => {return { ...task, category: category.category}});
		})
		.reduce( (previous, current) => { 
			return previous.concat(current)
		}, [])
		.filter((task) => task != null && task.location != null)
		.map((task) => {
			return <div onClick = {() => { onMapClick(task.task_id); }} key={task.task_id} lat={task.location.lat} lng={task.location.lng}
			style={boxStyle(task.category)}>
				<a hRef={"#" + task.task_id} style={textStyle}>{task.task}
				</a>
			</div>			
		});

	const map = <div id={"mapDiv"} style={{height:"500px"}}>
				<GoogleMap
					bootstrapURLKeys={{key: "AIzaSyDDcfEVg23HT3XKP50OtYbNza1GIJC6OXk"}}
					center={center}
					zoom={13}
					onTouch={() => {alert("hey");}}>
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
						<input className = "input is-primary" id={'catAdd_' + agenda.agenda_id} type="text"/>
						<input className = "button is-primary" type="button" value="Add Category" onClick={onAddClick}/>
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