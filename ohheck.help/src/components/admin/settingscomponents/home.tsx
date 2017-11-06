import * as React from 'react';
import { Icon } from 'components/common';
import { Editor } from '..';

export class HomeSettings extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            textchoice: 'false',
            hometext: ''
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    save = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
    }

    render() {
        return (
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
                                checked={this.state.textchoice === 'false'} /> Redirect to a survey
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
        )
    }
}