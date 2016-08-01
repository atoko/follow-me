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
	getInitialState()
	{
		return {loading: true}
	}
	filterCSS(type_id) 	{
		const app = this.props.portal;		
		const css = "button ";
		const selected = app.filters[type_id] ? "is-info is-medium" : "is-medium";
		return css + selected;
	}
	componentDidMount() {
	}	
	render() {
		const portal = this.props.portal;
		const center = portal.center;
		if (center == null) //portal.portals == null || portal.portals.length == 0)
		{
			return <div> Loading.. </div>
		}

		const mapOnChange = function(args)
		{
			const coordinates = args.center;

			this.setState({loading: true});
			this.props.doSetCenter({"lat":coordinates.lat,"lng":coordinates.lng, "setOrigin": false})	
			//Need to cluster more
			coordinates.lat = Math.floor(coordinates.lat * 100000 / 10) * 10;
			coordinates.lng = Math.floor(coordinates.lng * 100000 / 100) * 100;			
			fetch(`${root}/portals/${Math.floor(coordinates.lat)}/${Math.floor(coordinates.lng)}`, {
				method: 'GET', 
				mode: 'cors'
			})
			.then((response) => {
				this.setState({loading: false});
				return response.json()
			})
			.then((json) => {
				this.props.doSetPortals(json);
			});			
		}.bind(this);

		const onGetLocation = () => {
			navigator.geolocation.getCurrentPosition(function(p){
				this.props.doSetCenter({"lat":p.coords.latitude,"lng":p.coords.longitude, "setOrigin": true})
			}.bind(this));
		};

		const onSetLocation = (event) => {
			const address = ReactDOM.findDOMNode(this.refs[event.target.value]).value;
			const geocoder = new google.maps.Geocoder();
			const request = {
				address
			};
			
			geocoder.geocode(request, function(c, cb) {
				if (cb == "OK")
				{
					const location = c[0].geometry.location;
					this.props.doSetCenter({"lat":location.lat(),"lng":location.lng(), "setOrigin": true})						
				}
			}.bind(this));			
		};

		var categories = [];
		if (portal.selected.length > 0)
		{
			categories.push(<Category key="selected" type_id={1} portal={portal.selected}/>);			
		}
		categories.push(<Category key="toc" type_id={0} portal={portal.filtered}/>);
		categories.push(   <div className="content has-text-centered">
      <p>
        <strong>victoryroad.me</strong> by <a href="mailto:pedro@evermagica.com">atoko</a>. All licenses owned by Niantic Inc. and Gamefreak 
      </p>
      <p>
        <a className="icon" target="_blank" href="https://twitter.com/pokestopteam">
          <i className="fa fa-twitter"></i>
        </a>
      </p>
    </div>				);
		if (this.state != null && this.state.loading) 
		{ 
			categories = [
				<div key="modal" className = "loading" style={{overflow:"hidden", height:"50vh"}}> 

				<div key="lol" className="loadingContent"> <button style={{marginLeft:"-40px", marginTop:"-40px", height:"80px", width:"80px"}}  className="button is-loading"> </button></div>					
						
				</div>,

			]
		}
		var status = <span></span>;
		var newHeader = 
<div id="myheader" className="nav">
	<div className="">
		<img alt="" height="30%" src="../assets/m/webPKGO.png" width="34" />
	</div>
		<img alt="" height="100%" src="../assets/title.png"  />
	<div className="level nav-right is-hidden-mobile">
		<div className="level-left is-flex">
			<span className="level-item">
				<button className="button is-info level-item" onClick={onGetLocation}><span className="fa fa-location-arrow"> </span></button>						
				<small className="level-item"> or </small>
			</span>
			<span className="control has-addons">
				<SearchBox ref="headerSearch" style={{height: "32px"}}/>								
				<button className="button is-info" value="headerSearch" onClick={onSetLocation}><span className="fa  fa-search" value="headerSearch"></span></button>
			</span>					
		</div>									
	</div>
</div>

	var onItemClick = function(p)
	{
		this.props.doSetSelected({portal:p, selected:!p.selected});
	}.bind(this);
	var map = <span />;

	var controls = <span> </span>;
	var message = 	<article style={{marginTop: '60px'}} className="message">
			<div className="message-header">
				Welcome to Pokestop.help!
			</div>
			<div className="message-body">
				To begin, use the search to find an address. <br/>
				Please remember that only Puerto Rico pokestop locations are available,
			</div>
		</article>	
	if (portal.center != null)
	{
		message = 	<article style={{marginTop: '60px'}} className="message is-info">
						<div className="message-header">
							Hello!
						</div>
						<div className="message-body">
							Welcome to Victory Road. Begin by selecting pokestops near you, then press the <strong> map button </strong>, to generate a <strong> route.</strong>
						</div>
					</article>	
		map = <Map center={portal.center} origin={portal.origin} ref="map"  onChange={mapOnChange} items={portal.filtered} onItemClick={onItemClick}/>
		controls = <div className="box level" style={{backgroundColor: "teal"}}>
						<div className="level is-hidden-tablet">
								<span className="subtitle" style={{color: "white"}}>Search</span>
							<div className="level-left is-flex">
								<span className="level-item">
									<button className="button is-info level-item" onClick={onGetLocation}><span className="fa fa-location-arrow"> </span></button>						
								</span>
								<span className="control has-addons">
									<SearchBox ref="levelSearch" style={{height: "32px"}}/>								
									<button className="button is-info" value="levelSearch" onClick={onSetLocation}><span className="fa fa-search" value="levelSearch"></span></button>
								</span>					
							</div>									
						</div>						
						<hr/>
						<div className="level-item">
							<span className="subtitle" style={{color: "white"}}>{portal.distance + "m "}</span>
							<div>
								<input type="range" min="500" max="4000" step="250" defaultValue="1500" onTouchEnd={this.props.doSetDistance} onMouseUp={this.props.doSetDistance} />
							</div>
						</div>
						<hr/>
						<span className="level-item" style={{marginRight: "7vw"}}>
							<button style={{height:"60px", marginLeft: "auto", marginRight: "7vw"}} className="is-fullwidth button is-info level-item" onClick={() =>{ this.refs.map.doRoute(portal.selected);}}><strong className="fa fa-map"> Map</strong></button>						
						</span>
						<div className="level-right container"> 						
							<div className="level-item " style={{color: "white"}}>Filter </div>
							<button className={"level-item button " + this.filterCSS(2)} onClick={this.props.doSetFilter} value="2">
								<div className="image is-24x24">
									<img value="2" className=""  src={`/assets/m/pokestop.png`}/>			
								</div>
							</button>
							<button className={"level-item button " + this.filterCSS(3)} onClick={this.props.doSetFilter} value="3">
								<div className="image is-24x24">
									<img value="3" className="is-unselectable"  src={`/assets/m/gym.png`}/>			
								</div>					
							</button>		
						</div>									
					</div>				
	}
		return (
			<div className="HolyGrail-body">
				{newHeader}
				
				<div className="HolyGrail-content content" style={{maxWidth:"1024px"}}>
					{message}	
					{map}
					{controls}
					
				</div>
				<div className="HolyGrail-nav">

				<div className="image" style={{height:"77px", top:"50px", marginTop:"2px", backgroundColor:"teal"}}> </div>
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
		return <input ref="input" {...this.props} type="text" />;
	}
	componentDidMount() {
		var input = ReactDOM.findDOMNode(this.refs.input);
		this.searchBox = new google.maps.places.SearchBox(input);
		this.searchBox.addListener('places_changed', this.onPlacesChanged); 
		
		input.placeholder = "Enter an address";
	}
	componentWillUnmount() {
		//this.searchBox.removeListener('places_changed', this.onPlacesChanged);
	}
}
export default Agenda;