import { authenticate, dismissNotification } from 'actions/admin';
import { ErrorBoundary, Icon } from 'components/common';
import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { Notification } from 'types/admin';
import { IAdminStore, IReduxProps } from 'types/redux';
import * as a from '.';

interface IAdminProps {
    admin: IAdminStore;
}

@connect(state => ({ admin: state.admin }))
export default class Admin extends React.Component<IAdminProps & IReduxProps, any> {
    constructor(props: IAdminProps & IReduxProps) {
        super(props);
    }

    public auth = (token: string, expiration: Date): void => {
        const { dispatch } = this.props;

        dispatch(authenticate(token, expiration));
    }

    public dismiss = (): void => {
        const { dispatch } = this.props;

        const note = this.props.admin.notifications.find(item => !item.seen);

        if (!note) {
            return;
        }

        note.seen = true;

        dispatch(dismissNotification(note));
    }

    public displayNotification = (): JSX.Element => {
        const { notifications } = this.props.admin;

        if (notifications.length === 0) {
            return <div className="pure-u-2-3">&nbsp;</div>;
        }

        const note = notifications.find(item => !item.seen);

        if (!note) {
            return <div className="pure-u-2-3">&nbsp;</div>;
        }

        return (
            <div className="pure-u-15-24 item">
                <div className={`pure-u-1 notification ${note.level}`}>
                    <div className="pure-u-5-24">
                        {moment(note.created).format('M/D/YYYY h:mm a')}
                    </div>
                    <div className="pure-u-14-24">
                        {note.text}
                    </div>
                    <div className="pure-u-4-24">
                        {note.action ? <Link to={`${note.action.location}`}>{note.action.text}</Link> : ' '}
                    </div>
                    <div className="pure-u-1-24" onClick={this.dismiss} style={{ cursor: 'pointer' }}>
                        <Icon icon="close" />
                    </div>
                </div>
            </div>
        );
    }

    public displayLogin = () => {
        if (!this.props.admin.bearer) {
            return (
                <div className="pure-u-1">
                    <a.Login authenticate={this.auth} />
                </div>
            );
        } else {
            return (
                <div>
                    <a.AdminNav />
                    <div className="pure-u-3-4 slide-in-container">
                        <ErrorBoundary isAdmin={true}>
                            <Route exact path="/dashboard" component={a.AdminHome} />

                            <Route path="/dashboard/responses/:id" component={a.Responses} />
                            <Route exact path="/dashboard/responses" render={() => <h3>Please go back and select a survey.</h3>} />

                            <Route path="/dashboard/bycard/:id" component={a.SurveysByCard} />
                            <Route exact path="/dashboard/bycard" render={() => <h3>Please go back and select a survey.</h3>} />

                            <Route path="/dashboard/groups/:id" component={a.SingleGroup} />
                            <Route exact path="/dashboard/groups" component={a.Groups} />

                            <Route path="/dashboard/subunits/:id" component={a.SingleSubunit} />
                            <Route exact path="/dashboard/subunits" component={a.Subunits} />

                            <Route path="/dashboard/idols/:id" component={a.SingleIdol} />
                            <Route exact path="/dashboard/idols" component={a.Idols} />

                            <Route exact path="/dashboard/cards/:id" component={a.SingleCard} />
                            <Route exact path="/dashboard/cards/:skip/:take" component={a.AllCards} />

                            <Route path="/dashboard/survey/:id" component={a.SurveyView} />
                            <Route exact path="/dashboard/survey" component={a.NewSurvey} />

                            <Route path="/dashboard/settings" component={a.Settings} />

                            <Route path="/dashboard/akiedit" component={a.AkiEdit} />
                        </ErrorBoundary>
                    </div>
                </div>
            );
        }
    }

    public render() {
        return (
            <div className="pure-u-1 some-space">
                <div className="pure-u-1 flex-contain">
                    <div className="pure-u-1-3 item">
                        <h1>Oh Heck! Admin</h1>
                    </div>
                    {this.displayNotification()}
                </div>
                {this.displayLogin()}
            </div>
        );
    }
}
