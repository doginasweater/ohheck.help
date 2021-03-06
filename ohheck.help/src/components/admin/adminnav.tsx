﻿import { logout } from 'actions/admin';
import { Icon } from 'components/common';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class AdminNav extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    public logout = event => {
        const { dispatch } = this.props;

        dispatch(logout());
    }

    public render() {
        return (
            <div className="pure-u-1-4 slide-in-container">
                <h3>menu</h3>
                <ul className="no-indent slide-in">
                    <li>
                        <Icon icon="home" />
                        <Link to="/dashboard">
                            Admin Home
                        </Link>
                    </li>
                    <li className="divider" />
                    <li>
                        <Icon icon="create" />
                        <Link to="/dashboard/survey">
                            New Survey
                        </Link>
                    </li>
                    <li className="divider" />
                    <li>
                        <Icon icon="group" />
                        <Link to="/dashboard/groups">
                            Groups
                        </Link>
                    </li>
                    <li>
                        <Icon icon="group_work" />
                        <Link to="/dashboard/subunits">
                            Subunits
                        </Link>
                    </li>
                    <li>
                        <Icon icon="person" />
                        <Link to="/dashboard/idols">
                            Idols
                        </Link>
                    </li>
                    <li>
                        <Icon icon="view_carousel" />
                        <Link to="/dashboard/cards/0/48">
                            Cards
                        </Link>
                    </li>
                    <li className="divider" />
                    <li>
                        <Icon icon="person" />
                        <Link to="/dashboard/akiedit">
                            Edit Aki Page
                        </Link>
                    </li>
                    <li className="divider" />
                    <li>
                        <Icon icon="settings" />
                        <Link to="/dashboard/settings">
                            Settings
                        </Link>
                    </li>
                    <li className="divider" />
                    <li>
                        <Icon icon="close" />
                        <Link to="/" onClick={this.logout}>
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default connect((state: any) => ({ admin: state.admin }))(AdminNav);
