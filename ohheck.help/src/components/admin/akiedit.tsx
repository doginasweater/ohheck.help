import * as React from 'react';
import { connect } from 'react-redux';
import { IReduxProps, IAdminStore } from 'types/redux';
import { Editor } from '.';
import { Icon } from 'components/common';

interface AkiEditProps {
    admin: IAdminStore
}

@connect(state => ({ admin: state.admin }))
export default class AkiEdit extends React.Component<AkiEditProps & IReduxProps, any> {
    constructor(props) {
        super(props);

        this.state = {
            akiedit: ''
        };
    }

    handleChange = (event: React.FormEvent<HTMLTextAreaElement>): void => {
        this.setState({
            akiedit: event.currentTarget.value
        });
    }

    save = (event: React.FormEvent<HTMLButtonElement>): void => {
        event.preventDefault();
    }

    render() {
        return (
            <div className="pure-u-1 slide-in">
                <h3>Edit the Aki Profile Page</h3>

                <form className="pure-form pure-form-stacked">
                    <fieldset>
                        <legend>Page contents</legend>
                        <Editor name="akiedit" value={this.state.akiedit} handleChange={this.handleChange} disabled={false} />
                    </fieldset>
                    <fieldset>
                        <legend>Save</legend>
                        <button className="pure-button button-primary" type="button" onClick={this.save}>
                            <Icon icon="done" /> Save Changes
                        </button>
                    </fieldset>
                </form>
            </div>
        );
    }
}
