import * as React from 'react';
import { connect } from 'react-redux';
import { Editor } from '.';
import { Icon } from 'components/common';
import { Notification } from 'types/admin';
import { setNotification, logout } from 'actions/admin';
import { IReduxProps, IAdminStore } from 'types/redux';
import { CommentsSettings, HomeSettings, Sync } from './settingscomponents';

interface ISettingsProps extends IReduxProps {
    admin: IAdminStore;
}

@connect(state => ({ admin: state.admin }))
export default class Settings extends React.Component<ISettingsProps, any> {
    constructor(props) {
        super(props);

        this.state = {
            tab: 'HomeSettings',
            tabs: {
                'HomeSettings': HomeSettings,
                'Sync': Sync
            }
        };
    }

    changeTab = (tab: string) => {
        this.setState({
            tab: tab
        });
    }

    render() {
        const CurTab = this.state.tabs[this.state.tab];

        return (
            <div className="pure-u-1 slide-in">
                <h3>Settings</h3>

                <form className="pure-form pure-form-aligned">
                    <div className="pure-u-1 tab-row">
                        <div className="pure-u-1-4 tab" onClick={() => this.changeTab("HomeSettings")}>
                            Home Page
                        </div>
                        <div className="pure-u-1-4 tab" onClick={() => this.changeTab("Sync")}>
                            Card Sync
                        </div>
                    </div>
                    <CurTab />
                </form>
            </div>
        );
    }
}