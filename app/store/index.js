import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import logger from 'redux-logger';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
// import {addFirebaseListeners} from '../lib/firebase'
const sagaMiddleware = createSagaMiddleware();
import rootSaga from '../sagas';

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, logger),
  // composeWithDevTools(
  // applyMiddleware(logger),
  // applyMiddleware(sagaMiddleware, logger),
  // other store enhancers if any
  // ),
);
sagaMiddleware.run(rootSaga);
export default store;

// DISABLED EXAMPLE
// Trigger Redux actions on Firebase events
// addFirebaseListeners(store.dispatch, store.getState)
