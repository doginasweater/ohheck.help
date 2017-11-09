import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { responsesFetch, surveysFetch } from '../../actions/admin';
import { Response, ResponseAnswer } from '../../types/admin';
import { IAdminStore, IReduxProps } from 'types/redux';
import { Survey } from 'types/admin/survey';
import { Question } from 'types/admin/question';

interface IResponsesProps {
    admin: IAdminStore;
}

@connect(state => ({ admin: state.admin }))
export default class Responses extends React.Component<IResponsesProps & IReduxProps, any> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        if (!this.props.admin.surveys || this.props.admin.surveys.length === 0) {
            dispatch(surveysFetch());
        }

        dispatch(responsesFetch(this.props.match.params.id));
    }

    getAnswer = (q: ResponseAnswer) => {
        switch (q.type) {
            case 'Cards':
                return q.cards;
            case 'MultiLineText':
            case 'SingleLineText':
                return q.text ? q.text : 'No answer';
            case 'SelectBox':
            case 'RadioButtons':
                return q.answer;
            case 'Checkbox':
                return q.selections.join(', ');
            default:
                return 'unknown answer';
        }
    }

    renderList = list =>
        list.map((item: Response, index) =>
            <tr key={index}>
                <td>{item.submitted}</td>
                {item.questions.map((item: ResponseAnswer, i: number) =>
                    <td key={item.id}>{this.getAnswer(item)}</td>
                )}
            </tr>
        );

    renderHeading = (survey: Survey): JSX.Element[] => survey.questions.map((item: Question, index: number) =>
        <th key={index}>{item.text ? item.text : 'Cards'}</th>
    );

    render() {
        if (this.props.admin.responsesloading || this.props.admin.surveysloading) {
            return (
                <div className="pure-u-1 slide-in">
                    <h3>Survey Responses</h3>
                    <div>
                        Loading...
                    </div>
                </div>
            )
        }

        if (!this.props.admin.responsesloading && !this.props.admin.responses || !this.props.admin.surveys) {
            return (
                <div className="pure-u-1 slide-in">
                    <h3>Survey Responses</h3>
                    <div>
                        Unable to load responses
                    </div>
                </div>
            );
        }

        const survey = this.props.admin.surveys.find(item => item.id === Number(this.props.match.params.id));

        if (!survey) {
            return (
                <div className="pure-u-1 slide-in">
                    <h3>Survey Responses</h3>
                    <div>
                        Unable to load survey data
                    </div>
                </div>
            );
        }

        const body = this.props.admin.responses && this.props.admin.responses.length > 0 ?
            this.renderList(this.props.admin.responses) :
            <tr><td colSpan={survey.questions.length + 1}>No Responses</td></tr>;

        return (
            <div className="pure-u-1 slide-in">
                <h3>Survey Responses for {survey.name}</h3>
                <table className="pure-table pure-table-striped pure-table-horizontal">
                    <thead>
                        <tr>
                            <th>Submitted</th>
                            {this.renderHeading(survey)}
                        </tr>
                    </thead>
                    <tbody>
                        {body}
                    </tbody>
                </table>
            </div>
        );
    }
}
