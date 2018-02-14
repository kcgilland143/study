import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'



let store = createStore(applyMiddleware(thunk))


ReactDOM.render(<App />, document.getElementById("root"));
