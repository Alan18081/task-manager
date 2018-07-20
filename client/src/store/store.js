import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";

import mainReducer from "./reducers";
import * as sagas from "./sagas";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  connectRouter(history)(mainReducer),
  composeWithDevTools(
    applyMiddleware(sagaMiddleware, routerMiddleware(history))
  )
);

Object.values(sagas).forEach(sagaMiddleware.run.bind(sagaMiddleware));

export default store;
