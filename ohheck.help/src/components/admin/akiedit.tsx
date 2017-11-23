import { settingsFetch, settingsUpdate, updateSetting } from 'actions/admin';
import { Icon } from 'components/common';
import * as React from 'react';
import { connect } from 'react-redux';
import { IAdminStore, IReduxProps } from 'types/redux';
import { Editor } from '.';

interface IAkiEditProps {
    admin: IAdminStore;
}

@connect(state => ({ admin: state.admin }))
export default class AkiEdit extends React.Component<IAkiEditProps & IReduxProps, any> {
    constructor(props) {
        super(props);

        const { dispatch } = props;

        dispatch(settingsFetch());
    }

    public handleChange = (event: React.FormEvent<HTMLTextAreaElement>): void =>
        this.props.dispatch(updateSetting('akipage', event.currentTarget.value))

    public save = (event: React.FormEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        const { dispatch } = this.props;

        // tslint:disable-next-line:no-string-literal
        dispatch(settingsUpdate('akipage', this.props.admin.settings['akipage']));
        dispatch(settingsFetch());
    }

    public render() {
        let error = <span />;

        if (this.props.admin.settingsloading) {
            return (
                <div className="pure-u-1 slide-in">
                    Loading...
                </div>
            );
        }

        if (!this.props.admin.settingsloading && !this.props.admin.settingsubmitsuccess && this.props.admin.settingsubmitmessage) {
            error =
                <p style={{ color: 'red' }}>
                    There was an error submitting your change: {this.props.admin.settingsubmitmessage}
                </p>;
        } else if (!this.props.admin.settingsloading && this.props.admin.settingsubmitsuccess) {
            error =
                <p style={{ color: '#3c763d' }}>
                    Updated successfully!
                </p>;
        }

        // tslint:disable-next-line:no-string-literal
        const text = this.props.admin.settings['akipage'];

        return (
            <div className="pure-u-1 slide-in">
                <h3>Edit the Aki Profile Page</h3>

                <form className="pure-form pure-form-stacked">
                    <fieldset>
                        <legend>Page contents</legend>
                        <Editor name="akiedit" value={text} handleChange={this.handleChange} disabled={false} escapeHtml={false} />
                    </fieldset>
                    <fieldset>
                        <legend>Save</legend>
                        <button className="pure-button button-primary" type="button" onClick={this.save}>
                            <Icon icon="done" /> Save Changes
                        </button>
                        {error}
                    </fieldset>
                </form>
            </div>
        );
    }
}
