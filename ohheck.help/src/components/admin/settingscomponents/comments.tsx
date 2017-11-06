import * as React from 'react';
import { connect } from 'react-redux';
import { IReduxProps, IAdminStore } from 'types/redux';
import { Editor } from '..';
import { Icon } from 'components/common';

interface CommentsProps {
    admin: IAdminStore
}

@connect(state => ({ admin: state.admin }))
export class CommentsSettings extends React.Component<CommentsProps & IReduxProps, any> {
    constructor(props) {
        super(props);

        this.state = {
            commentsblurb: ''
        };
    }

    handleChange = (event: React.FormEvent<HTMLTextAreaElement>): void => {
        this.setState({
            commentsblurb: event.currentTarget.value
        });
    }

    save = (event: React.FormEvent<HTMLButtonElement>): void => {
        event.preventDefault();
    }

    render() {
        return (
            <div className="pure-u-1 slide-in">
                <fieldset>
                    <legend>Settings</legend>
                    <div className="pure-control-group inline">
                        <span className="label">Turn Comments on?</span>
                        <div className="pure-u-1-4">
                            <label htmlFor="on" className="pure-radio">
                                <input type="radio" name="status" id="on" value="on" checked={true} /> On
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
                                <input type="radio" name="anon" id="anonon" value="on" checked={true} /> On
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
                        <Icon icon="done" /> Save Changes
                        </button>
                </fieldset>
            </div>
        );
    }
}
