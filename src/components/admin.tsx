import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import AdminHome from './adminhome';
import Responses from './responses';
import SurveysByCard from './surveysbycard';

export default class Admin extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            authenticated: false
        };
    }

    auth = password => {
        console.log('value', password);

        if (password === 'a hidden gem') {
            this.setState({
                authenticated: true
            });
        }
    }

    render() {
        return (
            <div className="pure-u-1">
                <h1>Oh Heck! Admin</h1>
                {this.state.authenticated &&
                    <div className="pure-u-1-4">
                        <h3>menu</h3>
                        <Link to="/dashboard/responses">
                            All Responses
                        </Link>
                        <br />
                        <Link to="/dashboard/bycard">
                            Responses By Card
                        </Link>
                    </div>
                }
                <div className="pure-u-3-4">
                    <Route exact path="/dashboard" render={props => <AdminHome auth={this.auth} authenticated={this.state.authenticated} {...props} />} />
                    <Route path="/dashboard/responses" component={Responses} />
                    <Route path="/dashboard/bycard" component={SurveysByCard} />
                </div>
            </div>
        );
    }
}