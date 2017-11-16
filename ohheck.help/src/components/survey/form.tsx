import { clearSurveyError, fetchSurvey, setCard, setChoice, setSelection, setSurveyError, submitSurvey } from 'actions/survey';
import { Icon, Idol, MDown, Questions } from 'components/common';
import { Subunit } from 'components/survey';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Survey } from 'types/admin';
import { IReduxProps, ISurveyStore } from 'types/redux';
import { SurveySubmission } from 'types/survey';

interface IFormProps extends IReduxProps {
    form: ISurveyStore;
}

@connect(state => ({ form: state.survey }))
export default class Form extends React.Component<IFormProps, any> {
    constructor() {
        super();
    }

    public componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchSurvey(this.props.match.params.id));
    }

    public handleClick = (id: number): void => {
        const { dispatch, form } = this.props;

        dispatch(setCard(id, !form.cards[id]));
    }

    public handleChange = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        const { dispatch, form } = this.props;

        dispatch(setChoice(event.currentTarget.name, event.currentTarget.value));
    }

    public handleCheckbox = (questionid: string, answerid: string, value: boolean): void => {
        const { dispatch, form } = this.props;

        let val = true;

        if (form.choices[questionid]) {
            if (form.choices[questionid].selections) {
                if (form.choices[questionid].selections[answerid]) {
                    val = !form.choices[questionid].selections[answerid];
                }
            }
        }

        dispatch(setSelection(questionid, answerid, val));
    }

    public submit = event => {
        event.preventDefault();

        const { dispatch, form } = this.props;

        dispatch(clearSurveyError());

        if (!form.survey) {
            return;
        }

        for (const q of form.survey.questions) {
            const a = form.choices[q.id];

            if (q.required) {
                if (!a) {
                    console.log('error on', q.id);
                    dispatch(setSurveyError('You have to answer all required questions!'));
                    return;
                }

                if (q.type !== 'Checkbox') {
                    if (!a.choice) {
                        console.log('missing choice on', q.id);
                        console.log('answer', a);
                        dispatch(setSurveyError('You have to answer all required questions!'));
                        return;
                    }
                } else if (q.type === 'Checkbox') {
                    if (!a.selections || !Object.keys(a.selections).some(item => a.selections![item] === true)) {
                        console.log('missing choice on', q.id);
                        console.log('answer', a);
                        dispatch(setSurveyError('You must select at least one checkbox'));
                        return;
                    }
                }
            }
        }

        const toSubmit: SurveySubmission = {
            surveyid: form.survey.id,
            choices: form.choices,
            cards: form.cards
        };

        dispatch(submitSurvey(toSubmit));
    }

    public render() {
        if (this.props.form.submitsuccess) {
            return <Redirect to="/thanks" />;
        }

        if (this.props.form.loading) {
            return (
                <div className="pure-u-1">
                    loading...
                </div>
            );
        }

        const { form } = this.props;

        if (!form || !form.survey || form.error) {
            return (
                <div className="pure-u-1">
                    Oh no! There was an error loading the survey :(
                </div>
            );
        }

        if (form.survey && !form.survey.active) {
            return (
                <div className="pure-u-1">
                    <h1>{form.survey.title}</h1>
                    <div>
                        Sorry! This survey is not active. Do you want to try going <Link to="/">home</Link>?
                    </div>
                </div>
            );
        }

        let error = <span />;

        if (!form.submitting && !form.submitsuccess && form.submitresponse) {
            error =
                <p style={{ color: 'red' }}>
                    There was an error submitting your survey: {form.submitresponse}
                </p>;
        }

        return (
            <div className="pure-u-1">
                <h1>{form.survey.title}</h1>
                <MDown text={form.survey.comments} />
                <form name="survey" className="pure-form pure-form-stacked">
                    <Questions
                        questions={form.survey.questions}
                        ispublic={true}
                        handleClick={this.handleClick}
                        handleChange={this.handleChange}
                        handleCheckbox={this.handleCheckbox}
                        choices={form.choices}
                        cards={form.cards} />
                    <p className="center">
                        <button className="pure-button button-primary" onSubmit={this.submit} onClick={this.submit}>
                            <Icon icon="done" /> submit!
                        </button>
                    </p>
                    {error}
                </form>
            </div>
        );
    }
}
