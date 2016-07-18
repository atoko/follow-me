import React from 'react';
class MapItem extends React.Component {
	boxStyle(style) {
		const styles = {
			'1': 'SPICYMAYO',
			'2': 'POKESTOP',
			'3': 'GYM',
			'4': 'DORMANT'
		}
		const MARKER_SIZE = 20;
		return {
			position: 'absolute',
			borderRadius:"10px", 
			width: MARKER_SIZE,
			height: MARKER_SIZE,
			//backgroundColor: hashStringToColor("styles[style]"), 
			border:"solid" + hashStringToColor(styles[style]),
			left: -MARKER_SIZE / 2,
			top: -MARKER_SIZE / 2,
			whiteSpace: 'nowrap'
		}
	}
	render() {
		const textStyle = {
			marginLeft:"3px",
			fontWeight: 'bold',
			fontSize:12,
			textShadow: "-1px -1px 0 #000,    1px -1px 0 #000,    -1px 1px 0 #000,     1px 1px 0 #000",
			color:'#F2f2F8'};

		const popupStyle = {
			zIndex: '999999',
			marginTop:'-50',
			marginLeft:'-50',
		 	position: 'absolute'
		};

		const onMapClick = (task_id) =>
		{
			document.getElementById(task_id).scrollIntoView();		
		}

		const portal = this.props.item;
		var popup = <span />
		
		if (this.props.$hover) {
			popup = <div className="is-info message" style={popupStyle}>
				<div className="message-header"> </div>
				<div className="message-body is-unselectable"><strong style={{fontSize: 15}}>{portal.name}</strong></div>
			</div>
		};
        const styles = {
			'1': 'webPKGO',
			'2': 'pokestop',
			'3': 'gym',
			'4': 'DORMANT'
		}			  
		return <div
				style={this.boxStyle(portal.type_id)}>
			{popup}
          	<img width="100%" src={`/assets/m/${styles[portal.type_id]}.png`}/>
		</div>;
	}
}

export default MapItem;