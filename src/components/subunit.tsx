import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Subunit extends React.Component<any, any> {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h2>aqours</h2>
                {this.props.children}
            </div>
        )
    }
}