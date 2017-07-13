import * as React from 'react';
import { Subunit } from 'components/survey';
import { Idol } from 'components/common';
import { Survey } from 'types/admin';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSurvey, submitSurvey } from 'actions/survey';
import { IReduxProps, ISurveyStore } from 'types/redux';
import { setCard, setChoice } from 'actions/survey';
import { Icon, MDown, Questions } from 'components/common';
import { SurveySubmission } from 'types/survey';
import 'whatwg-fetch';

interface IFormProps extends IReduxProps {
    form: ISurveyStore;
}

@connect(state => ({ form: state.survey }))
export default class Form extends React.Component<IFormProps, any> {
    constructor() {
        super();
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchSurvey(this.props.match.params.id));
    }

    handleClick = (id: number): void => {
        const { dispatch, form } = this.props;

        dispatch(setCard(id, !form.cards[id]));
    }

    handleChange = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        const { dispatch, form } = this.props;

        dispatch(setChoice(event.currentTarget.name, event.currentTarget.value));
    }

    submit = event => {
        event.preventDefault();

        const { dispatch, form } = this.props;

        if (!form.survey) {
            return;
        }

        console.log('choices', form.choices);
        console.log('cards', form.cards);

        const toSubmit: SurveySubmission = {
            surveyid: form.survey.id,
            choices: form.choices,
            cards: form.cards
        };

        dispatch(submitSurvey(toSubmit));
    }

    render() {
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
                        choices={form.choices}
                        cards={form.cards} />
                    <p className="center">
                        <button className="pure-button button-primary" onSubmit={this.submit} onClick={this.submit}>
                            <Icon icon="done" /> submit!
                        </button>
                    </p>
                </form>
            </div>
        );
    }
}