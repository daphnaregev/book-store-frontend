import React from 'react';
import App from './components/App'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import {applyMiddleware, compose, createStore} from 'redux'
import booksReducer from './redux/reducers/booksReducer'
import booksApiMiddleware from "./redux/middlewares/booksApiMiddleware";
import loggerMiddleware from './redux/middlewares/loggerMiddleware';

const enhancers = compose(applyMiddleware(booksApiMiddleware));
const store = createStore(booksReducer, undefined, enhancers);render (
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
