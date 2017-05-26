import * as React from 'react';
import { Link, Route } from 'react-router-dom';

import AdminHome from './adminhome';
import AdminNav from './adminnav';
import Responses from './responses';
import SurveysByCard from './surveysbycard';
import Login from './login';
import Groups from './groups';
import Subunits from './subunits';
import Idols from './idols';
import AllCards from './allcards';
import SurveyView from './surveyview';
import NewSurvey from './newsurvey';

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
                        <AdminNav />
                    </div>
                    <div className="pure-u-3-4">
                        <Route exact path="/dashboard" component={AdminHome} />

                        <Route path="/dashboard/responses/:id" component={Responses} />
                        <Route exact path="/dashboard/responses" render={() => <h3>Please go back and select a survey.</h3>} />

                        <Route path="/dashboard/bycard/:id" component={SurveysByCard} />
                        <Route exact path="/dashboard/bycard" render={() => <h3>Please go back and select a survey.</h3>} />

                        <Route path="/dashboard/groups" component={Groups} />
                        <Route path="/dashboard/subunits" component={Subunits} />
                        <Route path="/dashboard/idols" component={Idols} />
                        <Route path="/dashboard/cards" component={AllCards} />

                        <Route path="/dashboard/survey/:id" component={SurveyView} />
                        <Route exact path="/dashboard/survey" component={NewSurvey} />
                    </div>
                </div>
            );
        }
    }
}