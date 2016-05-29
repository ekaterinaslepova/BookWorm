import {createStore, applyMiddleware} from 'redux';
import React from 'react';
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom';
import io from 'socket.io-client'
import App from './components/app'
import Error from './components/error'
import reducer from './reducer'
import * as actions from './actions';
import remoteActionMiddleware from './remote_action_middleware';

const css = require('../style/main.css');

const socket = io(`${location.protocol}//${location.hostname}:8090`);
const store = createStore(
    reducer,
    applyMiddleware(remoteActionMiddleware.bind(this, socket)));

socket.on('start', (data) => {
    store.dispatch(actions.init(data));
    ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
    }
);
socket.on('next', (book) => {
    store.dispatch(actions.nextBook(book));
});
socket.on('stop', (error) => {
    ReactDOM.render(
        <Error error={error} />,
        document.getElementById('root')
    )
});
