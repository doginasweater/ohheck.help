import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Routes from './routes';
import { store } from './store/store';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <Router children={Routes} />
    </Provider>,
    document.getElementById("react-root")
);
