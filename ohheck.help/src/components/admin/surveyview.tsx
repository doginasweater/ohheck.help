import * as React from 'react';
import { Survey, Question } from '../../types/admin';
import 'whatwg-fetch';
import Questions from '../questions';

interface SurveyViewState {
    survey: Survey;
    loading: boolean;
    choices: any;
    cards: any;
}

export default class SurveyView extends React.Component<any, SurveyViewState> {
    constructor(props) {
        super(props);

        this.state = {
            survey: new Survey({}),
            loading: true,
            choices: {},
            cards: {}
        };
    }

    componentDidMount = () => {
        fetch(`/admin/survey/${this.props.match.params.id}`, {
            credentials: 'same-origin'
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(json => {
                let data = new Survey(json);

                this.setState({
                    survey: data,
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

    render() {
        if (this.state.loading) {
            return (
                <div>Loading...</div>
            );
        }

        const { survey } = this.state;

        return (
            <div>
                <h3>{survey.name}</h3>
                <div className="breathing-room">
                    <div className="pure-u-1-2">
                        <b>Title</b>: {survey.title}
                    </div>
                    <div className="pure-u-1-3">
                        <b>Slug (url)</b>: {survey.slug}
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
                        <div dangerouslySetInnerHTML={this.createMarkup()} />
                    </div>
                    <div className="pure-u-1">
                        <form className="pure-form pure-form-stacked">
                            <b>Questions</b>:
                            <Questions
                                questions={this.state.survey.questions}
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
