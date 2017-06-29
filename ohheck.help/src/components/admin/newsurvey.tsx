import * as React from 'react';
import { connect } from 'react-redux';
import { Survey, Question, Answer, IAdminStore, ISurveyMgmt } from '../../types/admin';
import { IReduxProps } from '../../types/redux';
import { NewQuestion } from './questions';
import { Editor } from '.';
import { newSetActive, newSetComments, newSetName, newSetQuestions, newSetSlug, newSetTitle } from '../../actions/surveymgmt';

interface NewSurveyProps extends IReduxProps {
    admin: IAdminStore;
    surveymgmt: ISurveyMgmt;
}

@connect(state => ({
    admin: state.admin,
    surveymgmt: state.surveymgmt
}))
export default class NewSurvey extends React.Component<NewSurveyProps, any> {
    constructor(props) {
        super(props);
    }

    handleChange = event => {
        const { dispatch } = this.props;
        let { newsurvey } = this.props.surveymgmt;

        switch (event.target.name) {
            case 'name':
                dispatch(newSetName(event.target.value));
                return;
            case 'title':
                dispatch(newSetTitle(event.target.value));
                return;
            case 'comments':
                dispatch(newSetComments(event.target.value));
                return;
            case 'active':
                dispatch(newSetActive(event.target.value === 'true'));
                return;
        }
    }

    handleSlug = event => {
        const regex = /^[a-z0-9\-]*$/;

        if (regex.test(event.target.value)) {
            const { dispatch } = this.props;

            dispatch(newSetSlug(event.target.value));
        }
    }

    questionSort = (q1: Question, q2: Question) => {
        if (q1.sortorder < q2.sortorder) {
            return -1;
        } else if (q1.sortorder > q2.sortorder) {
            return 1;
        } else {
            return 0;
        }
    }

    renderQuestions = () => this.props.surveymgmt.newsurvey.questions
        .sort(this.questionSort)
        .map((item: Question, index: number) =>
            <NewQuestion
                key={index}
                deleteQuestion={this.deleteQuestion}
                question={item}
                save={this.saveQuestion}
                index={index}
                numquestions={this.props.surveymgmt.newsurvey.questions.length}
                shiftQuestion={this.moveQuestion} />);

    saveQuestion = (question: Question, index: number) => {
        const { dispatch } = this.props;
        let { questions } = this.props.surveymgmt.newsurvey;

        questions[index] = question;

        dispatch(newSetQuestions(questions));
    }

    moveQuestion = (movedQuestion: Question, index: number) => {
        let { questions } = this.props.surveymgmt.newsurvey;

        const unmoved = questions[index];
        const movingup = movedQuestion.sortorder < unmoved.sortorder;

        let toSwap = questions.filter(item => item.sortorder === movedQuestion.sortorder)[0];

        const toSwapIndex = questions.indexOf(toSwap);

        toSwap.sortorder = movingup ? toSwap.sortorder += 1 : toSwap.sortorder -= 1;

        questions[index] = movedQuestion;
        questions[toSwapIndex] = toSwap;

        const { dispatch } = this.props;

        dispatch(newSetQuestions(questions));
    }

    deleteQuestion = (event: React.FormEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        const { dispatch } = this.props;
        const { questions } = this.props.surveymgmt.newsurvey;

        dispatch(newSetQuestions(questions.filter(question => question.id !== Number(event.currentTarget.id))));
    }

    addQuestion = event => {
        event.preventDefault();

        const { dispatch } = this.props;
        const { questions } = this.props.surveymgmt.newsurvey;

        let newquestion = new Question({
            id: questions.length + 1,
            text: '',
            sortorder: questions.length + 1
        });

        dispatch(newSetQuestions(questions.concat([newquestion])));
    }

    render() {
        const { newsurvey } = this.props.surveymgmt;

        return (
            <div className="pure-u-1 slide-in">
                <h3>Create a new survey</h3>

                <form className="pure-form pure-form-stacked pure-u-1">
                    <fieldset>
                        <legend>Basic, required information</legend>

                        <div className="pure-control-group">
                            <label htmlFor="name">First, give it a name. This is for your purposes.</label>
                            <input type="text" name="name" value={newsurvey.name} onChange={this.handleChange} />
                        </div>

                        <div className="pure-control-group">
                            <label htmlFor="title">Now, give it a title, the one you want the world to see.</label>
                            <input type="text" name="title" value={newsurvey.title} onChange={this.handleChange} />
                        </div>

                        <div className="pure-control-group">
                            <label htmlFor="slug">
                                Now, give it a slug. This is the url that will load the survey.
                                This must be all lowercase and contain no spaces. Try using the subunit or group name. This 
                                box <b>will not</b> accept anything but lowercase letters, numbers, or hyphens.
                            </label>
                            <input type="text" name="slug" value={newsurvey.slug} onChange={this.handleSlug} />
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
                            <Editor handleChange={this.handleChange} value={newsurvey.comments} name="comments" />
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