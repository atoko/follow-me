import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { Provider } from "react-redux";
import configureStore from "./stores/configureStore";
import * as actions from "./actions";
import App from "./components/App";
import Agenda from "./components/Agenda";
import "whatwg-fetch";
import * as api from "./constants/api";
const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store);
ReactDOM.render(
	<Provider store={store}>   
		<Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Agenda}/>
      </Route>
    </Router>
  </Provider>,
	document.getElementById("app"));
	
navigator.geolocation.getCurrentPosition(function(p) {
	store.dispatch(actions.setCenter({ "lat": p.coords.latitude, "lng": p.coords.longitude, "setOrigin": true }));
});

//
setTimeout(() => {
	//Scrolling map via touch scrolls viewport.
	document.getElementById("mapDiv").addEventListener("touchmove", function(e) {
		e.preventDefault();
	}, false);
}, 5000);
