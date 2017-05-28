import * as React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../icon';

export default () => <ul className="no-indent">
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
        <Link to="/dashboard/cards">
            Cards
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
        <a href="/account/logout">
            Logout
        </a>
    </li>
</ul>;