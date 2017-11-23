import { surveysFetch } from 'actions/admin';
import { Icon } from 'components/common';
import * as React from 'react';
import { connect } from 'react-redux';
import { Survey } from 'types/admin';
import { IAdminStore, IReduxProps } from 'types/redux';
import { Editor } from '..';

interface IHomeSettingsProps {
    admin: IAdminStore;
}

@connect(state => ({ admin: state.admin }))
export class HomeSettings extends React.Component<IHomeSettingsProps & IReduxProps, any> {
    constructor(props: IHomeSettingsProps & IReduxProps) {
        super(props);

        if (!props.admin.surveys) {
            props.dispatch(surveysFetch());
        }
    }

    public handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    public save = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
    }

    public renderChoice = (): JSX.Element => {
        if (this.props.admin.settings['homechoice'] === 'text') {
            return <Editor handleChange={this.handleChange} value={this.props.admin.settings['hometext']} name="hometext" />;
        } else if (this.props.admin.surveys) {
            return (
                <div className="pure-control-group">
                    <label htmlFor="survey">Select Survey</label>
                    <select name="survey">
                        <option value="">Select One</option>
                        {this.props.admin.surveys.map((s: Survey, i: number) => <option value={s.id.toString()} key={i}>{s.name}</option>)}
                    </select>
                </div>
            );
        } else {
            return <div>uh oh</div>;
        }
    }

    public render() {
        if (this.props.admin.settingsloading) {
            return <h3>loading...</h3>;
        }

        const homechoice = this.props.admin.settings['homechoice'];

        return (
            <div>
                <fieldset>
                    <legend>Content Options</legend>

                    <div className="pure-control-group">
                        <span className="label">Home Page Content</span>
                        <div className="pure-u-1-2">
                            <label htmlFor="redirect" className="pure-radio">
                                <input type="radio" name="textchoice" onChange={this.handleChange} value="survey" checked={homechoice !== 'text'} /> Redirect to a survey
                            </label>

                            <label htmlFor="redirect" className="pure-radio">
                                <input type="radio" name="textchoice" onChange={this.handleChange} value="text" checked={homechoice === 'text'} /> Have text
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
        );
    }
}
