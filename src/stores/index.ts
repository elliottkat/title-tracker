import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import RootReducer from './RootReducer';
import { RootSaga } from './RootSaga';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Mount it on the Store
const store = createStore(RootReducer, applyMiddleware(sagaMiddleware, logger));

// Run the saga
sagaMiddleware.run(RootSaga);

export default store;
