import { clearNotifications, setNotification } from 'actions/admin';
import * as React from 'react';
import { connect } from 'react-redux';
import { Notification } from 'types/admin';
import { IAdminStore, IReduxProps } from 'types/redux';

interface IDevTestsState {
    num: number;
}

class DevTestsInner extends React.Component<IAdminStore & IReduxProps, any> {
    constructor(props) {
        super(props);

        this.state = {
            num: 0
        };
    }

    public createNotification = (event: React.MouseEvent<HTMLButtonElement>): void => {
        const { dispatch } = this.props;

        dispatch(setNotification(Notification.success(`Test notification ${this.state.num}`, 'web', 'web')));

        this.setState({
            num: this.state.num + 1
        });
    }

    public clearNotifications = (event: React.MouseEvent<HTMLButtonElement>): void =>
        this.props.dispatch(clearNotifications())

    public render() {
        return (
            <fieldset>
                <legend>Notification Test</legend>

                <button type="button" onClick={this.createNotification} className="pure-button button-primary">
                    Make a notification
                </button>

                <button type="button" onClick={this.clearNotifications} className="pure-button button-primary">
                    Clear Notifications
                </button>
            </fieldset>
        );
    }
}

export const DevTests = connect((state: any) => ({ admin: state.admin }))(DevTestsInner);
