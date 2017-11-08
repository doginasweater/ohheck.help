import * as React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'components/common';
import { IAdminStore, IReduxProps } from 'types/redux';
import 'whatwg-fetch';

interface ISyncProps {
    admin: IAdminStore
}

@connect(state => ({ admin: state.admin }))
export class Sync extends React.Component<ISyncProps & IReduxProps, any> {
    constructor(props) {
        super(props);
    }

    runSync = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        let headers = new Headers();
        headers.append('Authorization', `bearer ${this.props.admin.bearer}`);
        headers.append('Accept', 'application/json');

        fetch('/admin/sync', {
            method: 'POST',
            headers: headers
        }).then(response => console.log('response', response.json()));
    }

    render() {
        return (
            <fieldset>
                <legend>Card Sync</legend>

                <p>
                    Last Sync: some date
                </p>

                <button className="pure-button button-primary" onClick={this.runSync} onSubmit={this.runSync}>
                    <Icon icon="update" /> Sync Now
                </button>
            </fieldset>
        )
    }
}