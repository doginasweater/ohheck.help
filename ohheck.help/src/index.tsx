import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Routes from './routes';

ReactDOM.render(
    <Router children={Routes} />,
    document.getElementById("react-root")
);
