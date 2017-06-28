import * as React from 'react';
import { connect } from 'react-redux';
import { Survey, Question } from '../../types/admin';
import { surveyFetch, editSurvey, editSurveyStop } from '../../actions/surveymgmt';
import Questions from '../questions';

let ReactMarkdown: any = require('react-markdown');

interface SurveyViewState {
    survey: Survey;
    loading: boolean;
    choices: any;
    cards: any;
    editable: boolean;
}

@connect(state => ({
    admin: state.admin,
    surveymgmt: state.surveymgmt
}))
export default class SurveyView extends React.Component<any, SurveyViewState> {
    constructor(props) {
        super(props);

        this.state = {
            survey: new Survey({}),
            loading: true,
            choices: {},
            cards: {},
            editable: false
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(surveyFetch(this.props.match.params.id));
    }

    createMarkup = () => {
        return {
            __html: this.props.surveymgmt.survey.comments
        };
    }

    handleClick = id => {
        this.setState({
            cards: {
                ...this.state.cards,
                [id]: !this.state.cards[id]
            }
        });
    }

    handleChange = event => {
        this.setState({
            choices: {
                ...this.state.choices,
                [event.target.name]: event.target.value
            }
        });
    }

    toggleEdit = event => {
        event.preventDefault();

        const { dispatch } = this.props;

        if (this.props.surveymgmt.editable) {
            dispatch(editSurveyStop());
        } else {
            dispatch(editSurvey());
        }
    }

    render() {
        if (this.props.surveymgmt.surveyloading) {
            return (
                <div>Loading...</div>
            );
        }

        const { survey } = this.props.surveymgmt;

        return (
            <div className="pure-u-1 slide-in">
                <div className="pure-u-1-2">
                    <h3>{survey.name}</h3>
                </div>
                <div className="pure-u-1-2">
                    {/*<button onClick={this.toggleEdit} className="pure-button button-primary pull-right">
                        Edit Survey
                    </button>*/}
                </div>
                <div className="breathing-room">
                    <div className="pure-u-1-2">
                        <b>Title</b>: <span contentEditable={this.state.editable}>{survey.title}</span>
                    </div>
                    <div className="pure-u-1-3">
                        <b>Slug (url)</b>: <span contentEditable={this.state.editable}>{survey.slug}</span>
                    </div>
                    <div className="pure-u-1-3">
                        <b>Currently Active</b>: {survey.active ? "Yes" : "No"}
                    </div>
                    <div className="pure-u-1-3">
                        <b>Created</b> {survey.created} <b>by</b> {survey.createdby}
                    </div>
                    <div className="pure-u-1-3">
                        <b>Last modified</b> {survey.modified} <b>by</b> {survey.modifiedby}
                    </div>
                    <div className="pure-u-1">
                        <b>Comments</b>:
                        <ReactMarkdown escapeHtml={true} source={survey.comments} />
                    </div>
                    <div className="pure-u-1">
                        <form className="pure-form pure-form-stacked">
                            <b>Questions</b>:
                            <Questions
                                questions={this.props.surveymgmt.survey.questions}
                                ispublic={false}
                                handleClick={this.handleClick}
                                handleChange={this.handleChange}
                                choices={this.state.choices}
                                cards={this.state.cards} />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
