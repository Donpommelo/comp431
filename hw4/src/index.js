import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

import Reducer from './reducers'
import App from './components/app'

require('./styles.css');

const logger = createLogger();
const store = createStore(Reducer, applyMiddleware(logger));

render(
    <div id="app">
        <Provider store={store}>
            <App/>
        </Provider>
    </div>,
    document.getElementById('app')
);