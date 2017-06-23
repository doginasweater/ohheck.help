import * as React from 'react';
import * as Oidc from 'oidc-client';

export class Callback extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    componentWillMount = () => {
        new Oidc.UserManager({}).signinRedirectCallback().then(() => {
            window.location.href = "/identity";
        }).catch(e => {
            console.error(e);
        });
    }
}
