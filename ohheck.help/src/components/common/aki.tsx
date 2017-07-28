import * as React from 'react';
import { connect } from 'react-redux';
import { ISurveyStore, IReduxProps } from 'types/redux';
import { MDown } from './mdown';

interface AkiProps {
    survey: ISurveyStore
}

@connect(state => ({ survey: state.survey }))
export class Aki extends React.Component<AkiProps & IReduxProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pure-u-1">
                <MDown text={this.props.survey.aki} escapeHtml={false} />
            </div>
        );
    }
}