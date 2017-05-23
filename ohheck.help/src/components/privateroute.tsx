import * as React from 'react';
import { Route, Redirect } from 'react-router';

export default ({ component: Component, ...rest }) => {
    const makeRender = props => {
        if (props.authenticated) {
            return <Component {...props} />;
        } else {
            window.location.href = '/account/login';
        }
    }

    return <Route {...rest} render={props => makeRender(props)} />;
}