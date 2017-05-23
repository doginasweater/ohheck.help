import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import AdminHome from './adminhome';
import Responses from './responses';
import SurveysByCard from './surveysbycard';
export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.auth = password => {
            console.log('value', password);
            if (password === 'a hidden gem') {
                this.setState({
                    authenticated: true
                });
            }
        };
        this.state = {
            authenticated: false
        };
    }
    render() {
        return (React.createElement("div", { className: "pure-u-1" },
            React.createElement("h1", null, "Oh Heck! Admin"),
            this.state.authenticated &&
                React.createElement("div", { className: "pure-u-1-4" },
                    React.createElement("h3", null, "menu"),
                    React.createElement(Link, { to: "/dashboard/responses" }, "All Responses"),
                    React.createElement("br", null),
                    React.createElement(Link, { to: "/dashboard/bycard" }, "Responses By Card")),
            React.createElement("div", { className: "pure-u-3-4" },
                React.createElement(Route, { exact: true, path: "/dashboard", render: props => React.createElement(AdminHome, Object.assign({ auth: this.auth, authenticated: this.state.authenticated }, props)) }),
                React.createElement(Route, { path: "/dashboard/responses", component: Responses }),
                React.createElement(Route, { path: "/dashboard/bycard", component: SurveysByCard }))));
    }
}
//# sourceMappingURL=admin.js.map