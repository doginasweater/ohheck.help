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

    renderChoice = (): JSX.Element => {
        if (this.state.textchoice === 'true') {
            return <Editor handleChange={this.handleChange} value={this.state.hometext} name="hometext" />
        } else {
            return (
                <div className="pure-control-group">
                    <label htmlFor="survey">Select Survey</label>
                    <select name="survey">
                        <option value="">Select One</option>
                    </select>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <fieldset>
                    <legend>Content Options</legend>

                    <div className="pure-control-group">
                        <span className="label">Home Page Content</span>
                        <div className="pure-u-1-2">
                            <label htmlFor="redirect" className="pure-radio">
                                <input type="radio" name="textchoice" onChange={this.handleChange} value="false" checked={this.state.textchoice === 'false'} /> Redirect to a survey
                            </label>

                            <label htmlFor="redirect" className="pure-radio">
                                <input type="radio" name="textchoice" onChange={this.handleChange} value="true" checked={this.state.textchoice === 'true'} /> Have text
                            </label>
                        </div>
                    </div>

                    <div className="pure-u-1">
                        {this.renderChoice()}
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Save</legend>
                    <button className="pure-button button-primary" onClick={this.save} onSubmit={this.save}>
                        <Icon icon="done" /> Save
                    </button>
                </fieldset>
            </div>
        )
    }
}