import React from 'react';
class MapItem extends React.Component {
	boxStyle(style) {
		const styles = {
			'1': 'SPICYMAYO',
			'2': 'POKESTOP',
			'3': 'GYM',
			'4': 'DORMANT'
		}
		var MARKER_SIZE = 24;
		var border = "solid" + hashStringToColor(styles[style]);
		if (this.props.item.selected)
		{
			MARKER_SIZE = 40;
			border = "5px solid teal";
		}
		return {
			position: 'absolute',
			borderRadius:"10px", 
			width: MARKER_SIZE,
			height: MARKER_SIZE,
			backgroundColor: hashStringToColor(styles[style]), 
			border: border,
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
			marginTop:'-50px',
			marginLeft:'-50px',
		 	position: 'absolute'
		};

		const onMapClick = (task_id) =>
		{
			document.getElementById(task_id).scrollIntoView();		
		}

		const portal = this.props.item;
		var style = this.boxStyle(portal.type_id);

		var popup = <span />
		
		if (this.props.$hover) 
		{
			const MARKER_SIZE = 40;
			style['left'] = -MARKER_SIZE / 2;
			style['top'] = -MARKER_SIZE / 2;
			style['width'] = MARKER_SIZE;
			style['height'] = MARKER_SIZE;
			style['border'] = "3px solid black";			
		};
        const styles = {
			'1': 'un',
			'2': 'pokestop',
			'3': 'gym',
			'4': 'DORMANT'
		}			  
		return <div style={style} onClick={this.props.onClick}>
			{popup}
          	<img width="100%" src={`/assets/m/${styles[portal.type_id]}.png`}/>
		</div>;
	}
}

export default MapItem;