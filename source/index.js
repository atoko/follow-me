import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import * as actions from './actions';
import App from './components/App';
import Agenda from './components/Agenda';
import 'whatwg-fetch';

const store = configureStore();
const root = 'https://waypoint-oracle.herokuapp.com';
fetch(`${root}/portals/18459600/66744200`, {
	method: 'GET', 
	mode: 'cors'
})
  .then((response) => {return response.json()})
  .then((json) => {
     store.dispatch(actions.setPortals(json));
  });

const history = syncHistoryWithStore(browserHistory, store);


ReactDOM.render(
 <Provider store={store}>   
  <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Agenda} />
        <Route path="/" component={Agenda} />

      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);

global.hashStringToColor = function(str) {
  var hash = 5381;
  for (var i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
  }
  var r = (hash & 0xFF0000) >> 16;
  var g = (hash & 0x00FF00) >> 8;
  var b = hash & 0x0000FF;
  return "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2);
}

setTimeout(() => {
  document.getElementById('mapDiv').addEventListener('touchmove', function(e) {

          e.preventDefault();

  }, false) 
}, 5000);