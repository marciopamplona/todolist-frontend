import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore, compose } from "redux";
import { Provider } from "react-redux";
import * as storage from "redux-storage";
import createEngine from "redux-storage-engine-localstorage";
import merger from "redux-storage-merger-immutablejs";
import thunk from "redux-thunk";

import "./styles/index.css";
import App from "./components/App";
import reducers from "./components/todoReducer";

const rootReducer = storage.reducer(reducers, merger);
const engine = createEngine("todo-list-engine");
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const storageMiddleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(thunk, storageMiddleware)
)(createStore);
const store = createStoreWithMiddleware(rootReducer);

const load = storage.createLoader(engine);

load(store)
  // .then(newState => console.log("Loaded state:", JSON.stringify(newState)))
  .catch(() => console.log("Failed to load previous state"));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
