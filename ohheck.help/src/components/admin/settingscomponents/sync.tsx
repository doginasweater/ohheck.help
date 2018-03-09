import { clearNotifications, setNotification } from 'actions/admin';
import { Icon } from 'components/common';
import * as React from 'react';
import { connect } from 'react-redux';
import { Notification } from 'types/admin';
import { IAdminStore, IReduxProps } from 'types/redux';
import 'whatwg-fetch';

interface ISyncProps {
    admin: IAdminStore;
}

class SyncInner extends React.Component<ISyncProps & IReduxProps, any> {
    constructor(props: ISyncProps & IReduxProps) {
        super(props);
    }

    public runSync = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        const { dispatch } = this.props;

        dispatch(clearNotifications());

        const headers: Headers = new Headers();
        headers.append('Authorization', `bearer ${this.props.admin.bearer}`);
        headers.append('Accept', 'application/json');

        fetch('/admin/sync', {
            method: 'POST',
            headers
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        }).then(val => {
            if (val.success) {
                dispatch(setNotification(Notification.success('Card sync syccess!', 'web', 'web')));
            } else {
                dispatch(setNotification(Notification.error(`Card sync failed! Error: ${val.message}`, 'web', 'web')));
            }
        }).catch(error => dispatch(setNotification(Notification.error(`Card sync failed! Error: ${error}`, 'web', 'web'))));
    }

    public render(): JSX.Element {
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
        );
    }
}

export const Sync = connect((state: any) => ({ admin: state.admin }))(SyncInner);
