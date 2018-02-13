import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import hangmanApp from './reducers'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
//import './index.css';
//import 'bootstrap/dist/css/bootstrap.css';



let store = createStore(hangmanApp, applyMiddleware(thunk))


ReactDOM.render(<App />, document.getElementById("root"));




// export { default as FlashCards } from "./FlashCards";
// export { default as Hangman } from "./Hangman";

// let store = createStore(hangmanApp, applyMiddleware(thunk))

// ReactDOM.render(
//   <Provider store={store}>
//     <App  />
//   </Provider>,
//   document.getElementById('root')
// );