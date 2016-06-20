import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import * as actions from './actions';
import App from './components/App';
import Agenda from './components/Agenda';

const data = {
  "agenda_id": 1,
  "agenda": "nyc",
  "categories": [
    {
      "category_id": 1,
      "agenda_id": 1,
      "category": "food",
      "tasks": [
        {
          "task_id": 1,
          "category_id": 1,
          "task": "kimchi",
          "location": null,
          "file_id": null,
          "visited": null
        }
      ]
    },
    {
      "category_id": 2,
      "agenda_id": 1,
      "category": "the pit",
      "tasks": []
    },
    {
      "category_id": 3,
      "agenda_id": 1,
      "category": "delta",
      "tasks": [
        {
          "task_id": 2,
          "category_id": 3,
          "task": "rawr XD",
          "location": "",
          "file_id": null,
          "visited": null
        },
        {
          "task_id": 4,
          "category_id": 3,
          "task": "take selfie",
          "location": null,
          "file_id": null,
          "visited": null
        }
      ]
    }
  ]
}

const store = configureStore();
store.dispatch(actions.setAgenda(data));
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
