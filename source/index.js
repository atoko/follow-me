import React from 'react';
import ReactDOM from 'react-dom';
import Agenda from './components/Agenda';

const data = {
  "id": 1,
  "agenda": "nyc",
  "categories": [
    {
      "category_id": 1,
      "agenda_id": 1,
      "category": "food",
      "tasks": [
        {
          "id": 1,
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
      "category": "the fucking pit",
      "tasks": [
        null
      ]
    },
    {
      "category_id": 3,
      "agenda_id": 1,
      "category": "delta",
      "tasks": [
        {
          "id": 2,
          "category_id": 3,
          "task": "meatgrinder",
          "location": null,
          "file_id": null,
          "visited": null
        },
        {
          "id": 4,
          "category_id": 3,
          "task": "take selfie",
          "location": null,
          "file_id": null,
          "visited": null
        },
        {
          "id": 3,
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

ReactDOM.render(
  <Agenda categories={data.categories}/>,
  document.getElementById('app')
);
