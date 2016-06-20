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

const data = {
  "agenda_id": 1,
  "agenda": "nyc",
  "categories": [
    {
      "category_id": 1,
      "agenda_id": 1,
      "category": "Food",
      "tasks": [
        {
          "task_id": 1,
          "category_id": 1,
          "task": "Alice's Teashop",
          "location": {"lat":40.7780464,"lng":-73.97867859999997},
          "file_id": null,
          "visited": null
        }
      ]
    },
    {
      "category_id": 3,
      "agenda_id": 1,
      "category": "Stores",
      "tasks": [
        {
          "task_id": 2,
          "category_id": 3,
          "task": "IKEA",
          "location": {"lat":33.093868,"lng":-96.82122070000003},
          "file_id": null,
          "visited": null
        },
        {
          "task_id": 4,
          "category_id": 3,
          "task": "Whataburger",
          "location": {"lat":32.9101175,"lng":-96.87236999999999},
          "file_id": null,
          "visited": null
        }
      ]
    }
  ]
}

const store = configureStore();
fetch('http://localhost:3000/agenda/1', {
	method: 'GET', 
	mode: 'cors'
})
  .then((response) => {return response.json()})
  .then((json) => {store.dispatch(actions.setAgenda(json));});

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
