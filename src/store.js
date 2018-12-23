import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import reducer from './reducers';

export const history = createBrowserHistory();

const middleware = [
    routerMiddleware(history),
    thunkMiddleware
];

    middleware.push(createLogger());

export default {
    ...createStore(connectRouter(history)(reducer), applyMiddleware(...middleware))
};