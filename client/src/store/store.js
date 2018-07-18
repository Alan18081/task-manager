import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import mainReducer from "./reducers";
import * as sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  mainReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));

export default store;
