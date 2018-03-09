import { fetchAkiPage } from 'actions/survey';
import * as React from 'react';
import { connect } from 'react-redux';
import { IReduxProps, ISurveyStore } from 'types/redux';
import { MDown } from './mdown';

interface IAkiProps {
    survey: ISurveyStore;
}

export class AkiInner extends React.Component<IAkiProps & IReduxProps, any> {
    constructor(props: IAkiProps & IReduxProps) {
        super(props);
    }

    public componentWillMount() {
        this.props.dispatch(fetchAkiPage());
    }

    public render() {
        if (this.props.survey.loading) {
            return <div className="pure-u-1">loading...</div>;
        }

        if (this.props.survey.error) {
            return (
                <div className="pure-u-1">
                    There was an error loading the page
                </div>
            );
        }

        return (
            <div className="pure-u-1">
                <MDown text={this.props.survey.aki} escapeHtml={false} />
            </div>
        );
    }
}

export const Aki = connect((state: any) => ({ survey: state.survey }))(AkiInner);
