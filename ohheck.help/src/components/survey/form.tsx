import * as React from 'react';
import 'whatwg-fetch';
import Subunit from './subunit';
import Idol from './idol';
import { Survey } from '../../types/admin';
import Questions from '../questions';
import { Link } from 'react-router-dom';
import Icon from '../icon';
import { connect } from 'react-redux';
import { fetchSurvey } from '../../actions/survey';

let ReactMarkdown: any = require('react-markdown');

@connect(state => ({form: state.survey}))
export default class Form extends React.Component<any, any> {
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

    submit = event => {
        event.preventDefault();

        const toSubmit = {
            surveyid: this.props.form.survey.id,
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
            }
        }).then(data => {
            window.location.href = '/thanks';
        });
    }

    render() {
        if (this.props.loading) {
            return (
                <div className="pure-u-1">
                    loading...
                </div>
            );
        }

        if (!this.props.form.survey || this.props.error) {
            return (
                <div className="pure-u-1">
                    Oh no! There was an error loading the survey :(
                </div>
            )
        }

        const { survey } = this.props.form;

        if (survey && !survey.active) {
            return (
                <div className="pure-u-1">
                    <h1>{survey.title}</h1>
                    <div>
                        Sorry! This survey is not active. Do you want to try going <Link to="/">home</Link>?
                    </div>
                </div>
            );
        }

        return (
            <div className="pure-u-1">
                <h1>{survey.title}</h1>
                <ReactMarkdown escapeHtml={true} source={survey.comments} />
                <form name="survey" className="pure-form pure-form-stacked">
                    <Questions
                        questions={survey.questions}
                        ispublic={true}
                        handleClick={this.handleClick}
                        handleChange={this.handleChange}
                        choices={this.state.choices}
                        cards={this.state.cards} />
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