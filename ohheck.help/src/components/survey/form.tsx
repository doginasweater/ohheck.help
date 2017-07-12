import * as React from 'react';
import { Subunit } from 'components/survey';
import { Idol } from 'components/common';
import { Survey } from 'types/admin';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSurvey } from 'actions/survey';
import { IReduxProps, ISurveyStore } from 'types/redux';
import { setCard, setChoice } from 'actions/survey';
import { Icon, MDown, Questions } from 'components/common';
import 'whatwg-fetch';

interface IFormProps extends IReduxProps {
    form: ISurveyStore;
}

@connect(state => ({ form: state.survey }))
export default class Form extends React.Component<IFormProps, any> {
    constructor() {
        super();

        this.state = {
            choices: {},
            cards: {},
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(fetchSurvey(this.props.match.params.id));
    }

    handleClick = (id: number): void => {
        const { dispatch, form } = this.props;

        dispatch(setCard(id, !form.cards.get(id)));
    }

    handleChange = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        const { dispatch, form } = this.props;

        dispatch(setChoice(event.currentTarget.name, event.currentTarget.value));
    }

    submit = event => {
        event.preventDefault();

        const { survey } = this.props.form;

        if (!survey) {
            return;
        }

        const toSubmit = {
            surveyid: survey.id,
            choices: this.state.choices,
            cards: this.state.cards
        };

        fetch('/api/submit', {
            method: 'POST',
            body: JSON.stringify(toSubmit),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        }).then(data => {
            window.location.href = '/thanks';
        }).catch(error => {
            console.error(error);
        });
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