import * as React from 'react';
import { Survey, Question, Answer } from '../../types/admin';
import { NewQuestion } from './questions';
import { Editor } from '.';

interface NewSurveyState {
    name: string;
    title: string;
    comments: string;
    slug: string;
    active: string;
    questions: Question[];
}

export default class NewSurvey extends React.Component<any, NewSurveyState> {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            title: '',
            comments: '',
            slug: '',
            active: 'false',
            questions: []
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSlug = event => {
        const regex = /^[a-z0-9\-]*$/;

        if (regex.test(event.target.value)) {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
    }

    renderQuestions = () => this.state.questions.map(
        (item: Question, index: number) =>
            <NewQuestion
                key={index}
                deleteQuestion={this.deleteQuestion}
                question={item}
                save={this.saveQuestion}
                index={index} />
    )

    saveQuestion = (question, index) => {
        let qs: Question[] = [...this.state.questions];

        qs[index] = question;

        this.setState({
            questions: qs
        });
    }

    deleteQuestion = event => {
        event.preventDefault();

        this.setState({
            questions: this.state.questions.filter(question => {
                return question.id != event.target.id;
            })
        });
    }

    addQuestion = event => {
        event.preventDefault();

        this.setState({
            questions: [...this.state.questions, new Question({ id: this.state.questions.length + 1, text: '' })]
        });
    }

    render() {
        return (
            <div className="pure-u-1 slide-in">
                <h3>Create a new survey</h3>
                <form className="pure-form pure-form-stacked pure-u-1">
                    <fieldset>
                        <legend>Basic, required information</legend>

                        <div className="pure-control-group">
                            <label htmlFor="name">First, give it a name. This is for your purposes.</label>
                            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                        </div>

                        <div className="pure-control-group">
                            <label htmlFor="title">Now, give it a title, the one you want the world to see.</label>
                            <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
                        </div>

                        <div className="pure-control-group">
                            <label htmlFor="slug">
                                Now, give it a slug. This is the url that will load the survey.
                            This must be all lowercase and contain no spaces. Try using the subunit or group name. This box
                            <b>will not</b> accept anything but lowercase letters, numbers, or hyphens.
                        </label>
                            <input type="text" name="slug" value={this.state.slug} onChange={this.handleSlug} />
                        </div>

                        <div className="pure-control-group">
                            <div>Do you want this survey to be immediately active?</div>
                            <label htmlFor="true" className="pure-radio">
                                <input type="radio" name="active" value="true" id="true" onChange={this.handleChange} /> Yes
                        </label>
                            <label htmlFor="false" className="pure-radio">
                                <input type="radio" name="active" value="false" id="false" checked={true} onChange={this.handleChange} /> No
                        </label>
                        </div>

                        <div className="pure-control-group">
                            If you have any instructions to put at the top of the survey, you can put them here.
                            <Editor handleChange={this.handleChange} value={this.state.comments} name="comments" />
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Questions!</legend>
                        <div className="breathing-room">
                            {this.renderQuestions()}
                            <button onClick={this.addQuestion} className="pure-button button-primary">
                                <i className="material-icons">add</i> Add a new question
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    }
}