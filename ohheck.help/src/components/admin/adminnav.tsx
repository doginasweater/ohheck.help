import * as React from 'react';
import { Link } from 'react-router-dom';

export default () => <ul className="no-indent">
    <li>
        <Link to="/dashboard">
            Admin Home
        </Link>
    </li>
    <li className="divider" />
    <li>
        <Link to="/dashboard/newsurvey">
            New Survey
        </Link>
    </li>
    <li className="divider" />
    <li>
        <Link to="/dashboard/groups">
            Groups
        </Link>
    </li>
    <li>
        <Link to="/dashboard/subunits">
            Subunits
        </Link>
    </li>
    <li>
        <Link to="/dashboard/idols">
            Idols
        </Link>
    </li>
    <li>
        <Link to="/dashboard/cards">
            Cards
        </Link>
    </li>
    <li className="divider" />
    <li>
        <a href="/account/logout">
            Logout
        </a>
    </li>
</ul>;