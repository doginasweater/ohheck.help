import { setNotification } from 'actions/admin';
import * as React from 'react';
import { connect } from 'react-redux';
import { Notification } from 'types/admin';
import { IAdminStore, IReduxProps, ISurveyStore } from 'types/redux';

interface IErrorBoundaryProps {
    admin?: IAdminStore;
    survey?: ISurveyStore;
    isAdmin: boolean;
    children: JSX.Element[];
}

class ErrorBoundaryInner extends React.Component<IErrorBoundaryProps & IReduxProps, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            hasError: false
        };
    }

    public componentDidCatch(error: Error, info: React.ErrorInfo) {
        this.setState({
            hasError: true
        });

        if (this.props.isAdmin) {
            const { dispatch } = this.props;

            dispatch(setNotification(Notification.error(`Tell kevin "${error.message}"`, 'web', 'web')));
        }
    }

    public render() {
        if (this.state.hasError) {
            return <h3>Oh heck, something went wrong. Please refresh the page.</h3>;
        }

        return this.props.children;
    }
}

type OwnProps = Pick<IErrorBoundaryProps, 'isAdmin'>;

export const ErrorBoundary = connect(
    (state, ownProps: OwnProps) =>
        ownProps.isAdmin ? { admin: state.admin } : { survey: state.survey }
)(ErrorBoundaryInner);
