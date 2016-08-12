import React from "react";
import MapItem from "./mapItem.js";
import GoogleMap from "google-map-react";
class Map extends React.Component {
	constructor(props) {
		super(props);
		this.directionsService = new google.maps.DirectionsService();
	}
	doRoute(selected) {
		var path = [];
		for (var key in selected) {
			if (selected.hasOwnProperty(key)) {
				var element = selected[key];
				path.push({ location: new google.maps.LatLng(element.lat, element.lng), stopover: true });
			}
		}
		var p1 = new google.maps.LatLng(this.props.origin.lat, this.props.origin.lng);
		var p2 = new google.maps.LatLng(selected[selected.length - 1].lat, selected[selected.length - 1].lng);
		var request = {
			origin: p1,
			destination: p1,
			waypoints: path,
			travelMode: google.maps.TravelMode.WALKING,
			optimizeWaypoints: true
		};
		this.directionsService.route(request, function(response, status) {
			if (status == "OK") {
				this.directionsDisplay.setDirections(response);
			}
		}.bind(this));
	}
	render() {
		var items = <span/>;
		if (this.props.items.length != undefined) {
			var i = 1;
			items = this.props.items.map(function(portal) {
				i = i + 1;
				var onClick = function() { this.props.onItemClick(portal); }.bind(this);
				return <MapItem onClick={onClick} lat={portal.lat} lng={portal.lng} key={portal.name + i} item={portal} />;
			}.bind(this));
		}
		const MARKER_SIZE = 24;
		var indicatorStyle = {
			position: "absolute",
			borderRadius: "2px",
			left: -MARKER_SIZE / 2,
			top: -MARKER_SIZE / 2,
		};
		return <div id={"mapDiv"}>
							<GoogleMap
								bootstrapURLKeys={{key: "AIzaSyDDcfEVg23HT3XKP50OtYbNza1GIJC6OXk"}}
								center={this.props.center}
								zoom={14}
								onChange={this.props.onChange}
								onGoogleApiLoaded={({map, maps}) => { 
									this.directionsDisplay = new maps.DirectionsRenderer(); 
									this.directionsDisplay.setMap(map);							
								}}
								yesIWantToUseGoogleMapApiInternals>
								{items}		
								<img style={indicatorStyle} lat={this.props.center.lat} lng={this.props.center.lng}  width="18" height="24" src="../assets/m/webPKGO.png" />
								<img style={indicatorStyle} lat={this.props.origin.lat} lng={this.props.origin.lng}  width="24" height="32" src="../assets/m/dormant.png" />

							</GoogleMap>
		</div>;
	}
}
export default Map;