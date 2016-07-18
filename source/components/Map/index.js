import React from 'react';
import MapItem from './mapItem.js'
import GoogleMap from 'google-map-react';

class Map extends React.Component {
	render() {
		var items = <span/>;
		
		if (this.props.items.length != undefined)
		{
			var i = 1;
			items = this.props.items.map(function(portal) {
				i = i+1;
				return <MapItem lat={portal.lat} lng={portal.lng} key={portal.name + i} item={portal} />
			})
		}

		return <div id={"mapDiv"} style={{height:"500px"}}>
							<GoogleMap
								bootstrapURLKeys={{key: "AIzaSyDDcfEVg23HT3XKP50OtYbNza1GIJC6OXk"}}
								center={this.props.center}
								zoom={13}
								onChange={this.props.onChange}>
								{items}
							</GoogleMap>
		</div>		
	}
}

export default Map;