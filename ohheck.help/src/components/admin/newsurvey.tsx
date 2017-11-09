import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Survey, Question, Answer } from 'types/admin';
import { IAdminStore, ISurveyMgmt, IReduxProps } from 'types/redux';
import { NewQuestion } from './questions';
import { Editor } from '.';
import { newSetActive, newSetComments, newSetName, newSetQuestions, newSetSlug, newSetTitle, saveSurvey, surveyFetch } from 'actions/surveymgmt';
import { idolsListFetch, subunitsListFetch, groupsListFetch, surveysFetch, setNotification, clearNotifications } from 'actions/admin';
import { Icon } from 'components/common';
import { Notification } from 'types/admin/notification';

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

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(idolsListFetch());
        dispatch(subunitsListFetch());
        dispatch(groupsListFetch());
    }

    error = (text: string): void => {
        window.scrollTo(0, 0);
        this.props.dispatch(setNotification(Notification.error(text, 'web', 'web')));
    }

    handleChange = (event: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>): void => {
        const { dispatch } = this.props;

        switch (event.currentTarget.name) {
            case 'name':
                dispatch(newSetName(event.currentTarget.value));
                return;
            case 'title':
                dispatch(newSetTitle(event.currentTarget.value));
                return;
            case 'comments':
                dispatch(newSetComments(event.currentTarget.value));
                return;
            case 'active':
                dispatch(newSetActive(event.currentTarget.value === 'true'));
                return;
            default:
                return;
        }
    }

    handleSlug = (event: React.FormEvent<HTMLInputElement>): void => {
        const regex = /^[a-z0-9\-]*$/;

        if (regex.test(event.currentTarget.value)) {
            const { dispatch } = this.props;

            dispatch(newSetSlug(event.currentTarget.value));
        }
    }

    questionSort = (q1: Question, q2: Question): number => {
        if (q1.sortorder < q2.sortorder) {
            return -1;
        } else if (q1.sortorder > q2.sortorder) {
            return 1;
        } else {
            return 0;
        }
    }

    renderQuestions = (): JSX.Element[] => {
        const { newsurvey } = this.props.surveymgmt;

        if (newsurvey) {
            return newsurvey.questions
                .sort(this.questionSort)
                .map((item: Question, index: number) =>
                    <NewQuestion
                        key={index}
                        deleteQuestion={this.deleteQuestion}
                        question={item}
                        save={this.saveQuestion}
                        index={index}
                        numquestions={newsurvey.questions.length}
                        shiftQuestion={this.moveQuestion} />);
        } else {
            return [];
        }
    }

    saveQuestion = (question: Question, index: number): void => {
        const { dispatch } = this.props;
        const { newsurvey } = this.props.surveymgmt;

        if (!newsurvey) {
            return;
        }

        let { questions } = newsurvey;

        questions[index] = question;

        dispatch(newSetQuestions(questions));
    }

    moveQuestion = (movedQuestion: Question, index: number, up: boolean): void => {
        const { newsurvey } = this.props.surveymgmt;

        if (!newsurvey) {
            return;
        }

        let { questions } = newsurvey;

        const unmoved = questions[index];

        let toSwap = questions.find(item => item.sortorder === movedQuestion.sortorder);

        if (!toSwap) {
            return;
        }

        const toSwapIndex = questions.indexOf(toSwap);

        toSwap.sortorder = up ? toSwap.sortorder += 1 : toSwap.sortorder -= 1;

        questions[index] = movedQuestion;
        questions[toSwapIndex] = toSwap;

        const { dispatch } = this.props;

        dispatch(newSetQuestions(questions));
    }

    deleteQuestion = (event: React.FormEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        const { dispatch } = this.props;
        const { questions } = this.props.surveymgmt.newsurvey;
        const newQuestions = questions
            .filter(question => question.id !== Number(event.currentTarget.id))
            .map((item: Question, index: number) => ({ ...item, sortorder: index + 1 }));

        dispatch(newSetQuestions(newQuestions));
    }

    addQuestion = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        const { dispatch } = this.props;
        const { questions } = this.props.surveymgmt.newsurvey;

        let newquestion = new Question({
            id: questions.length + 1,
            text: '',
            sortorder: questions.length + 1,
            answers: []
        });

        dispatch(newSetQuestions(questions.concat([newquestion])));
    }

    validateQuestions = (questions: Question[]): boolean => {
        for (let i = 0; i < questions.length; i++) {
            const current = questions[i];

            switch (current.type) {
                case 'Cards':
                    if (!current.answers || !current.answers[0] || !current.answers[0].cards || current.answers[0].cards!.length === 0) {
                        this.error(`You must select at least one card for question ${current.sortorder}`);
                        return false;
                    }
                    break;
                case 'MultiLineText':
                case 'SingleLineText':
                    if (!current.text) {
                        this.error(`You must enter question text for question ${current.sortorder}`);
                        return false;
                    }
                    break;
                case 'SelectBox':
                case 'RadioButtons':
                case 'Checkbox':
                    if (!current.text) {
                        this.error(`You must enter question text for question ${current.sortorder}`);
                        return false;
                    }

                    if (!current.answers || current.answers.length === 0) {
                        this.error(`You must put in at least one answer for question ${current.sortorder}`);
                        return false;
                    }

                    for (let j = 0; j < current.answers.length; j++) {
                        const cura = current.answers[j];

                        if (!cura.text) {
                            this.error(`You must enter text for ${current.sortorder} answer ${j + 1}`);
                            return false;
                        }
                    }
                    break;
                default:
                    this.error(`Question ${current.sortorder} is an unknown type`);
                    return false;
            }
        }

        return true;
    }

    save = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        const { dispatch } = this.props;
        const { newsurvey } = this.props.surveymgmt;

        dispatch(clearNotifications());

        if (!newsurvey.name) {
            this.error('Your survey must have a name');
            return;
        }

        if (!newsurvey.title) {
            this.error('Your survey must have a title');
            return;
        }

        if (!newsurvey.slug) {
            this.error('You must provide a slug for your survey. This determines the url.');
            return;
        }

        if (!newsurvey.questions || newsurvey.questions.length === 0) {
            this.error('You must provide at least one question');
            return;
        }

        if (!this.validateQuestions(newsurvey.questions)) {
            return;
        }

        dispatch(saveSurvey(this.props.surveymgmt.newsurvey));
    }

    render() {
        const { newsurvey } = this.props.surveymgmt;
        const { dispatch } = this.props;

        if (!this.props.surveymgmt.surveyloading && !this.props.surveymgmt.savesuccess) {
            const { savemessage } = this.props.surveymgmt;

            this.error(savemessage ? savemessage : 'Server error');
        } else if (!this.props.surveymgmt.surveyloading && this.props.surveymgmt.savesuccess) {
            dispatch(surveysFetch());

            return <Redirect to="/dashboard" />;
        }

        return (
            <div className="pure-u-1 slide-in">
                <h3>Create a new survey</h3>

                <form className="pure-form pure-form-aligned pure-u-1">
                    <fieldset>
                        <legend>Basic, required information</legend>

                        <div className="pure-control-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" value={newsurvey.name} onChange={this.handleChange} className="pure-u-1-4" required />
                            <span className="pure-form-message-inline">
                                This is for your purposes.
                            </span>
                        </div>

                        <div className="pure-control-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" value={newsurvey.title} onChange={this.handleChange} className="pure-u-1-4" required />
                            <span className="pure-form-message-inline">
                                The name you want the world to see
                            </span>
                        </div>

                        <div className="pure-control-group">
                            <label htmlFor="slug">
                                Slug
                            </label>
                            <input type="text" name="slug" value={newsurvey.slug} onChange={this.handleSlug} className="pure-u-1-4" required />
                            <span className="pure-form-message-inline">
                                This will determine the survey URL. Lowercase letters, numbers, or hyphens <b>only</b>.
                            </span>
                        </div>

                        <div className="pure-control-group inline">
                            <span className="label">Start active</span>

                            <div className="pure-u-1-4">
                                <label htmlFor="true" className="pure-radio">
                                    <input type="radio" name="active" value="true" id="true" onChange={this.handleChange} /> Yes
                                </label>
                                <label htmlFor="false" className="pure-radio">
                                    <input type="radio" name="active" value="false" id="false" checked={true} onChange={this.handleChange} /> No
                                </label>
                            </div>

                            <span className="pure-form-message-inline">
                                Inactive forms are inaccessible to users
                            </span>
                        </div>

                        <div className="pure-control-group">
                            If you have any instructions to put at the top of the survey, you can put them here.
                            <Editor handleChange={this.handleChange} value={newsurvey.comments} name="comments" />
                        </div>
                    </fieldset>

                    <fieldset>
                        <legend>Questions!</legend>

                        <div className="questions-container">
                            {this.renderQuestions()}
                        </div>

                        <div className="breathing-room">
                            <button onClick={this.addQuestion} className="pure-button button-primary">
                                <Icon icon="add" /> Add a new question
                            </button>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Save Survey</legend>

                        <button className="pure-button button-primary" type="button" onClick={this.save} disabled={!this.props.surveymgmt.newsurvey}>
                            <Icon icon="done" /> Save
                        </button>
                    </fieldset>
                </form>
            </div>
        );
    }
}