import React from 'react';
import ReactDOM from 'react-dom'
import Category from './../Category';
import Map from './../Map';

const root = 'https://waypoint-oracle.herokuapp.com';

class Agenda extends React.Component
{
	constructor(props) {
		super(props)
	}
	filterCSS(type_id) 	{
		const app = this.props.portal;		
		const css = "button ";
		const selected = app.filters[type_id] ? "is-success is-medium" : "is-medium";
		return css + selected;
	}
	render() {
		const portal = this.props.portal;
		const center = portal.center;

		if (portal.portals == null || portal.portals.length == 0)
		{
			return <div> Loading.. </div>
		}

		const mapOnChange = function(args)
		{
			const coordinates = args.center;

			this.props.doSetCenter({"lat":coordinates.lat,"lng":coordinates.lng})	

			//Need to cluster more
			fetch(`${root}/portals/${Math.floor(coordinates.lat * 100000)}/${Math.floor(coordinates.lng * 100000)}`, {
				method: 'GET', 
				mode: 'cors'
			})
			.then((response) => {return response.json()})
			.then((json) => {
				this.props.doSetPortals(json);
			});			
		}.bind(this);

		const onGetLocation = () => {
			navigator.geolocation.getCurrentPosition(function(p){
				this.props.doSetCenter({"lat":p.coords.latitude,"lng":p.coords.longitude})
			}.bind(this));
		};

		const onSetLocation = () => {
			const address = ReactDOM.findDOMNode(this.refs.searchBox).value;
			const geocoder = new google.maps.Geocoder();
			const request = {
				address
			};

			geocoder.geocode(request, function(c, cb) {
				if (cb == "OK")
				{
					const location = c[0].geometry.location;
					this.props.doSetCenter({"lat":location.lat(),"lng":location.lng()})						
				}
			}.bind(this));			
		};

		var categories = <Category type_id={0} portal={portal.filtered} />;
		var status = <span></span>;
		
		return (
<div id="mainwrapper">
	<header>
		<div id="logo">
		</div>
		<nav>
			<div className="btnStyle">
				Boton 1
			</div>
			<div className="btnStyle">
				Boton 2
			</div>
			<div className="btnStyle">
				Boton 3
			</div>
			<div className="btnStyle">
				Boton 4
			</div>
		</nav>
	</header>
	<div className="notOnDesktop">
		<input placeholder="Search" type="text" />
	</div>
	<section id="mainContent">
		<div className="mapclass">
					<Map center={portal.center} onChange={mapOnChange} items={portal.filtered}/>
		</div>
	</section>
	<div id="content">
		<div id="sidebarcontainer">
			<section id="sidebar">
				<input placeholder="Search" type="text" />
				<div id="adimage">
					<img alt="" src=	"../BlogPostAssets/images/300x250.gif" />
				</div>
				<br/>
				<nav>
					{categories}
				</nav>
			</section>
		</div>
	</div>
</div>
		);
	}
}
class SearchBox extends React.Component {
	constructor() {
		super();
		this.onPlacesChanged = () => {
			if (this.props.onPlacesChanged) {
				this.props.onPlacesChanged(this.searchBox.getPlaces());
			}		
		}
		this.searchBox = null;
	}
	render() {
		return <input ref="input" {...this.props} type="text" />;
	}
	componentDidMount() {
		var input = ReactDOM.findDOMNode(this.refs.input);
		this.searchBox = new google.maps.places.SearchBox(input);
		this.searchBox.addListener('places_changed', this.onPlacesChanged); 
	}
	componentWillUnmount() {
		//this.searchBox.removeListener('places_changed', this.onPlacesChanged);
	}
}
export default Agenda;