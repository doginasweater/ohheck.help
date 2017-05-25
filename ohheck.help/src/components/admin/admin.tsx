import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import AdminHome from './adminhome';
import Responses from './responses';
import SurveysByCard from './surveysbycard';
import Login from './login';

export default class Admin extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: document.cookie.indexOf('AspNetCore.Identity.Application') !== -1
        };
    }

    auth = () => {
        this.setState({
            authenticated: true
        });
    }

    render() {
        if (!this.state.authenticated) {
            return (
                <div className="pure-u-1">
                    <h1>Oh Heck! Admin</h1>
                    <Login authenticate={this.auth} />;
                </div>
            );
        } else {
            return (
                <div className="pure-u-1 some-space">
                    <h1>Oh Heck! Admin</h1>
                    <div className="pure-u-1-4">
                        <h3>menu</h3>
                        <Link to="/dashboard">
                            Admin Home
                        </Link>
                        <br />
                        <Link to="/dashboard/responses">
                            All Responses
                        </Link>
                        <br />
                        <Link to="/dashboard/bycard">
                            Responses By Card
                        </Link>
                        <br />
                        <a href="/account/logout">
                            Logout
                        </a>
                    </div>
                    <div className="pure-u-3-4">
                        <Route exact path="/dashboard" render={props => <AdminHome auth={this.auth} authenticated={this.state.authenticated} {...props} />} />
                        <Route path="/dashboard/responses" component={Responses} />
                        <Route path="/dashboard/bycard" component={SurveysByCard} />
                    </div>
                </div>
            );
        }
    }
}