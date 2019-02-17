import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promise from 'redux-promise';

import App from './components/app';
import reducers from './reducers';
import { BrowserRouter } from "react-router-dom";
import { createLogger } from 'redux-logger';

const logger = createLogger({
    collapsed: true
});

const createStoreWithMiddleware = applyMiddleware(logger, promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    , document.querySelector('.app-container'));
