import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers/index';

const router = routerMiddleware(browserHistory);
const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk, router, logger)(createStore);

//const createStoreWithMiddleware = applyMiddleware(thunk, router)(createStore);


export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}