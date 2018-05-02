import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import 'antd/dist/antd.css';
import './css/index.css';
import rootReducer from './reducers';
import App from './App';

const store = createStore(rootReducer);

/* eslint-disable-next-line */
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
