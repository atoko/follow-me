import React from "react";
import * as util from "./../../constants/util";
class MapItem extends React.Component {
	boxStyle(style) {
		const styles = {
			"1": "",
			"2": "00EE22",
			"3": "22CCEE",
			"4": "DORMANT"
		};
		var MARKER_SIZE = 24;
		var border = "solid" + util.hashStringToColor(styles[style]);
		var zIndex = "2";
		if (this.props.item.selected) {
			MARKER_SIZE = 38;
			border = "2px solid" + util.hashStringToColor("selected");
			zIndex = 3;
		}
		return {
			position: "absolute",
			borderRadius: "20px",
			width: MARKER_SIZE,
			height: MARKER_SIZE,
			backgroundColor: util.hashStringToColor(styles[style]),
			border: border,
			left: -MARKER_SIZE / 2,
			top: -MARKER_SIZE / 2,
			whiteSpace: "nowrap",
			zIndex: zIndex
		};
	}
	render() {
		const portal = this.props.item;
		var style = this.boxStyle(portal.type_id);
		var popup = <span />;
		if (this.props.$hover) {
			const MARKER_SIZE = 36;
			style["left"] = -MARKER_SIZE / 2;
			style["top"] = -MARKER_SIZE / 2;
			style["width"] = MARKER_SIZE;
			style["height"] = MARKER_SIZE;
			style["border"] = "3px solid "+ util.hashStringToColor("hover");
		}
		const styles = {
			"1": "un",
			"2": "pokestop",
			"3": "gym",
			"4": "DORMANT"
		};
		return <div style={style} onClick={this.props.onClick}>
			{popup}
          	<img width="100%" src={`/assets/m/${styles[portal.type_id]}.png`}/>
		</div>;
	}
}
export default MapItem;