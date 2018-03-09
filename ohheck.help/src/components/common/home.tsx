import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

export class Home extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    public render() {
        return <Redirect to="/bandori" />;
    }
}
