import { Icon } from 'components/common';
import * as React from 'react';
import { connect } from 'react-redux';
import { IAdminStore, IReduxProps } from 'types/redux';
import { Editor } from '..';

interface ICommentsProps {
    admin: IAdminStore;
}

class CommentsSettingsInner extends React.Component<ICommentsProps & IReduxProps, any> {
    constructor(props) {
        super(props);

        this.state = {
            commentsblurb: ''
        };
    }

    public handleChange = (event: React.FormEvent<HTMLTextAreaElement>): void => {
        this.setState({
            commentsblurb: event.currentTarget.value
        });
    }

    public save = (event: React.FormEvent<HTMLButtonElement>): void => {
        event.preventDefault();
    }

    public render() {
        return (
            <div>
                <fieldset>
                    <legend>Settings</legend>
                    <div className="pure-control-group inline">
                        <span className="label">Turn Comments on?</span>
                        <div className="pure-u-1-4">
                            <label htmlFor="on" className="pure-radio">
                                <input type="radio" name="status" id="on" value="on" defaultChecked={true} /> On
                            </label>
                            <label htmlFor="off" className="pure-radio">
                                <input type="radio" name="status" id="off" value="off" /> Off
                            </label>
                        </div>
                    </div>
                    <div className="pure-control-group inline">
                        <span className="label">Allow Anonymous?</span>
                        <div className="pure-u-1-4">
                            <label htmlFor="anonon" className="pure-radio">
                                <input type="radio" name="anon" id="anonon" value="on" defaultChecked={true} /> On
                            </label>
                            <label htmlFor="anonoff" className="pure-radio">
                                <input type="radio" name="anon" id="anonoff" value="off" /> Off
                            </label>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Blurb</legend>
                    <Editor name="commentsblurb" value={this.state.commentsblurb} handleChange={this.handleChange} disabled={false} />
                </fieldset>
                <fieldset>
                    <legend>Save</legend>
                    <button className="pure-button button-primary" type="button" onClick={this.save}>
                        <Icon icon="done" /> Save
                    </button>
                </fieldset>
            </div>
        );
    }
}

export const CommentsSettings = connect((state: any) => ({ admin: state.admin }))(CommentsSettingsInner);
