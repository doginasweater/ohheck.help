import * as React from 'react';
import * as Oidc from 'oidc-client';
import 'whatwg-fetch';

export class IdentityTesting extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            text: ["It begins"]
        };
    }

    config = {
        authority: "http://localhost:5000",
        client_id: "js",
        redirect_uri: "http://localhost:55555/callback",
        response_type: "id_token token",
        scope: "openid profile api1",
        post_logout_redirect_uri: "http://localhost:55555"
    };

    mgr = new Oidc.UserManager(this.config);

    componentDidMount = () => {
        this.mgr.getUser().then(user => {
            if (user) {
                this.addText("User logged in!", user.profile);
            } else {
                this.addText("User not logged in", {error: 'none'});
            }
        });
    }

    login = () => this.mgr.signinRedirect();

    api = () => {
        this.mgr.getUser().then(user => {
            const url = "http://localhost:5001/identity";
            let headers = new Headers();

            headers.append("Authorization", "Bearer " + user.access_token);

            fetch(url, {
                method: 'GET',
                headers: headers
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    throw new Error(resp.statusText);
                }
            })
            .then(data => this.addText('api response', data))
            .catch(error => this.addText('error', error));
        });
    }

    logout = () => {
        this.mgr.signoutRedirect();
    }

    addText = (msg, text) => {
        this.setState({
            text: [
                ...this.state.text,
                msg + ': ' + JSON.stringify(text, null, 2)
            ]
        });
    }

    renderText = () => this.state.text.map((item, index) => <div key={index}>{item}</div>)

    render() {
        return (
            <div>
                <div className="pure-u-1">
                    <button onClick={this.login}>Login</button>
                    <button onClick={this.api}>Call API</button>
                    <button onClick={this.logout}>Logout</button>
                </div>
                <div className="pure-u-1">
                    <pre>
                        {this.renderText()}
                    </pre>
                </div>
            </div>
        );
    }
}
