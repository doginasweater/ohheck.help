import * as React from 'react';
import { Editor } from '.';
import { Icon } from 'components/common';

export default class Settings extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            hometext: ''
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    save = event => {
        event.preventDefault();
    }

    render() {
        return (
            <div className="pure-u-1 slide-in">
                <h3>Settings</h3>

                <form className="pure-form pure-form-stacked">
                    <fieldset>
                        <legend>Home Page</legend>
                        <p>
                            What do you want the home page to say?
                        </p>
                        <Editor handleChange={this.handleChange} value={this.state.hometext} name="hometext" />

                    </fieldset>
                    <fieldset>
                        <legend />
                        <button className="pure-button button-primary" onClick={this.save} onSubmit={this.save}>
                            <Icon icon="done" /> Save
                        </button>
                    </fieldset>
                </form>
            </div>
        );
    }
}
