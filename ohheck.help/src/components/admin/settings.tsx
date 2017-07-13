import * as React from 'react';
import { Editor } from '.';
import { Icon } from 'components/common';

export default class Settings extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            hometext: '',
            textchoice: 'false'
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

    runSync = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
    }

    render() {
        return (
            <div className="pure-u-1 slide-in">
                <h3>Settings</h3>

                <form className="pure-form pure-form-stacked">
                    <fieldset>
                        <legend>Home Page</legend>

                        <div className="pure-u-1">
                            <div className="pure-u-1">
                                <label htmlFor="redirect" className="pure-radio">
                                    <input
                                        type="radio"
                                        name="textchoice"
                                        onChange={this.handleChange}
                                        value="false"
                                        checked={this.state.textchoice === 'false'}
                                        /> Redirect to a survey
                                </label>

                                <select disabled={this.state.textchoice !== 'false'}>
                                    <option value="">Select One...</option>
                                    <option value="">first survey</option>
                                </select>
                            </div>

                            <div className="pure-u-1">
                                <label htmlFor="redirect" className="pure-radio">
                                    <input type="radio" name="textchoice" onChange={this.handleChange} value="true" checked={this.state.textchoice === 'true'} /> Have text
                                </label>

                                <Editor handleChange={this.handleChange} value={this.state.hometext} name="hometext" disabled={this.state.textchoice !== 'true'} />
                            </div>
                        </div>

                        <div className="pure-u-1">
                            <button className="pure-button button-primary" onClick={this.save} onSubmit={this.save}>
                                <Icon icon="done" /> Save
                            </button>
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Card Sync</legend>

                        <p>
                            Last Sync: some date
                        </p>

                        <button className="pure-button button-primary" onClick={this.runSync} onSubmit={this.runSync}>
                            <Icon icon="update" /> Sync Now
                        </button>
                    </fieldset>
                </form>
            </div>
        );
    }
}
