import * as React from 'react';
import { Link, Route } from 'react-router-dom';

export default class AdminHome extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            loginbox: ''
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    authbox = () => {
        if (!this.props.authenticated) {
            return (
                <div>
                    Enter password: <input type="text" name="loginbox" value={this.state.loginbox} onChange={this.handleChange} /><br />
                    <button onClick={() => this.props.auth(this.state.loginbox)}>Submit</button>
                </div>
            );
        } else {
            return <div>you're in</div>;
        }
    }

    render() {
        const content = this.authbox();

        return (
            <div>
                <h3>Home</h3>
                {content}
            </div>
        );
    }
}