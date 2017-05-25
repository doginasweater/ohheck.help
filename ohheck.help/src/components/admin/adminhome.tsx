import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import Login from './login';

export default class AdminHome extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    authbox = () => {
        if (!this.props.authenticated) {
            return <Login authenticate={this.props.auth} />;
        } else {
            return <div>you're in</div>;
        }
    }

    render() {
        const content = this.authbox();

        return (
            <div>
                <h3>Home</h3>
                {content}
            </div>
        );
    }
}