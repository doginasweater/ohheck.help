import * as React from 'react';
export default class AdminHome extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = event => {
            this.setState({
                [event.target.name]: event.target.value
            });
        };
        this.authbox = () => {
            if (!this.props.authenticated) {
                return (React.createElement("div", null,
                    "Enter password: ",
                    React.createElement("input", { type: "text", name: "loginbox", value: this.state.loginbox, onChange: this.handleChange }),
                    React.createElement("br", null),
                    React.createElement("button", { onClick: () => this.props.auth(this.state.loginbox) }, "Submit")));
            }
            else {
                return React.createElement("div", null, "you're in");
            }
        };
        this.state = {
            loginbox: ''
        };
    }
    render() {
        const content = this.authbox();
        return (React.createElement("div", null,
            React.createElement("h3", null, "Home"),
            content));
    }
}
//# sourceMappingURL=adminhome.js.map