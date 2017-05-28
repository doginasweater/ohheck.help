import * as React from 'react';
import { Redirect } from 'react-router-dom';

export default class Home extends React.Component<any, any> {
    constructor() {
        super();
    }

    render() {
        return <Redirect to={{ pathname: '/survey/cyaron' }} />;
    }
}