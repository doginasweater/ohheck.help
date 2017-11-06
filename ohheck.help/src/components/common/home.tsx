import * as React from 'react';
import { Link } from 'react-router-dom';

export class Home extends React.Component<any, any> {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="pure-g">
                <div className="pure-u-1">
                    <h1>Home</h1>
                    <p>
                        Current survey <Link to="/survey/cyaron">is here</Link>
                    </p>
                </div>
            </div>
        );
    }
}