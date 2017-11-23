import { logout, setNotification, settingsFetch } from 'actions/admin';
import { Icon } from 'components/common';
import * as React from 'react';
import { connect } from 'react-redux';
import { Notification } from 'types/admin';
import { IAdminStore, IReduxProps } from 'types/redux';
import { Editor } from '.';
import { CommentsSettings, DevTests, HomeSettings, Sync } from './settingscomponents';

interface ISettingsProps extends IReduxProps {
    admin: IAdminStore;
}

@connect(state => ({ admin: state.admin }))
export default class Settings extends React.Component<ISettingsProps & IReduxProps, any> {
    constructor(props: ISettingsProps & IReduxProps) {
        super(props);

        this.state = {
            tab: 'HomeSettings',
            tabs: {
                DevTests,
                HomeSettings,
                Sync
            }
        };

        props.dispatch(settingsFetch());
    }

    public changeTab = (tab: string) => {
        this.setState({
            tab
        });
    }

    public render() {
        const CurTab = this.state.tabs[this.state.tab];

        return (
            <div className="pure-u-1 slide-in">
                <h3>Settings</h3>

                <form className="pure-form pure-form-aligned">
                    <div className="pure-u-1 tab-row">
                        <div className="pure-u-1-4 tab" onClick={() => this.changeTab('HomeSettings')}>
                            Home Page
                        </div>
                        <div className="pure-u-1-4 tab" onClick={() => this.changeTab('Sync')}>
                            Card Sync
                        </div>
                        <div className="pure-u-1-4 tab" onClick={() => this.changeTab('DevTests')}>
                            Dev Tests
                        </div>
                    </div>
                    <CurTab />
                </form>
            </div>
        );
    }
}
