import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/stable';
// import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import App from './App';
// import history from './helpers/history';
import * as serviceWorker from './serviceWorker';

import './index.css';
import 'notyf/notyf.min.css'
				

ReactDOM.render(
  <DndProvider backend={Backend}>
    <App />
  </DndProvider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
