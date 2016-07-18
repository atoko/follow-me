import React from 'react';
import ReactDOM from 'react-dom'
import Category from './../Category';
import Map from './../Map';

const root = 'https://waypoint-oracle.herokuapp.com';

var defaultCenter = {"lat":18.45960,"lng":-66.7442464};

class Agenda extends React.Component
{
	constructor(props) {
		super(props)
		this.state = {center: defaultCenter};
	}
	render() {

		const portal = this.props.portal;
		const center = this.state.center || defaultCenter;

		if (portal.portals == null || portal.portals.length == 0)
		{
			return <div> Loading.. </div>
		}

		var lastLocation = null;
		const mapOnChange = function(args)
		{
			const coordinates = args.center;
			lastLocation = coordinates;

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
				this.setState({center: {"lat":p.coords.latitude,"lng":p.coords.longitude}})
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
					this.setState({center: {"lat":location.lat(),"lng":location.lng()}})					
				}
			}.bind(this));			
		};

		var categories = [<span key="_" />];
		var status = <span></span>;
		if (portal.portals.length != undefined)
		{
			status = <span>{portal.portals.length + ""}</span>;
			var groupedCategories = {
				1: [],
				2: [],
				3: [],
				4: []
			};
			
			portal.portals.forEach(function(element) {
				groupedCategories[element.type_id].push(element);
			}, this);

			categories.push(<Category key={1} type_id={2} portal={groupedCategories[2]}></Category>);
			categories.push(<Category key={2} type_id={3} portal={groupedCategories[3]}></Category>);
			categories.push(<Category key={3} type_id={1} portal={groupedCategories[1]}></Category>);
			categories.push(<Category key={4} type_id={4} portal={groupedCategories[4]}></Category>);
		}
		
		return (
			<div>
				<div>
					<Map center={this.state.center} onChange={mapOnChange} items={portal.portals}/>
					<div className="box level">
						<div className="level-left">
							<button className="button is-primary level-item" onClick={onGetLocation}><span className="fa fa-location-arrow"> </span></button>
						</div>
						<div className="level-right">
							<div className="control has-addons">
								<SearchBox ref="searchBox" />
								<button className="button is-primary" onClick={onSetLocation}><span className="fa  fa-search"></span></button>
							</div>					
						</div>						
					</div>
					{categories}
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
		return <input ref="input" {...this.props} type="text" defaultValue="22"/>;
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