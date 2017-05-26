import * as React from 'react';
import 'whatwg-fetch';
import Subunit from './subunit';
import Idol from './idol';
import { Survey } from '../../types/admin';
import Questions from '../questions';

interface FormState {
    survey: Survey;
    loading: boolean;
    choices: any;
    cards: any;
}

export default class Form extends React.Component<any, FormState> {
    constructor(props) {
        super(props);

        this.state = {
            survey: new Survey({}),
            loading: true,
            choices: {},
            cards: {}
        };
    }

    componentWillMount = () => {
        fetch(`/api/survey/${this.props.match.params.id}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    survey: new Survey(data),
                    loading: false
                });
            });
    }

    createMarkup = () => {
        return {
            __html: this.state.survey.comments
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

    submit = event => {
        const toSubmit = {
            surveyid: this.state.survey.id,
            choices: this.state.choices,
            cards: this.state.cards
        };

        console.log('to subnit', toSubmit);

        event.preventDefault();

        fetch('/api/submit', {
            method: 'POST',
            body: JSON.stringify({
                surveyid: this.state.survey.id,
                choices: this.state.choices,
                cards: this.state.cards
            }),
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
        if (this.state.loading) {
            return (
                <div className="pure-u-1">
                    loading...
                </div>
            );
        }

        return (
            <div className="pure-u-1">
                <h1>{this.state.survey.title}</h1>
                <div dangerouslySetInnerHTML={this.createMarkup()} />
                <form name="survey" className="pure-form pure-form-stacked">
                    <Questions
                        questions={this.state.survey.questions}
                        ispublic={true}
                        handleClick={this.handleClick}
                        handleChange={this.handleChange}
                        choices={this.state.choices} 
                        cards={this.state.cards} />
                    <p className="center">
                        <button className="pure-button button-primary" onSubmit={this.submit} onClick={this.submit}>
                            submit!
                        </button>
                    </p>
                </form>
            </div>
        );
    }
}