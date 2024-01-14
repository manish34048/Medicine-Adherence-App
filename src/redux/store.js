import rootSaga from './sagas/rootSaga';
import rootReducer from './reducers/rootReducers';
import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
export const store = () => {
  let rootStore = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  return rootStore;
};
export default store;
