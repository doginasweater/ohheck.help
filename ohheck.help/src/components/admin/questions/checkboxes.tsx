import * as React from 'react';
import { Question, Answer } from 'types/admin';
import { Icon } from 'components/common';

interface NewCheckboxesProps {
    question: Question;
    save: (question: Question, index: number) => void;
    index: number;
}

export default class NewCheckboxes extends React.Component<NewCheckboxesProps, any> {
    constructor(props) {
        super(props);
    }

    answerSort = (a1: Answer, a2: Answer): number => {
        if (a1.sortorder < a2.sortorder) {
            return -1;
        } else if (a1.sortorder > a2.sortorder) {
            return 1;
        } else {
            return 0;
        }
    }

    handleChange = event => {
        const q: Question = {
            ...this.props.question,
            text: event.target.value
        };

        this.props.save(q, this.props.index);
    }

    addAnswer = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        const a: Answer = new Answer({
            id: this.props.question.answers.length + 1,
            text: '',
            value: '',
            sortorder: this.props.question.answers.length,
            cards: null
        });

        const q: Question = {
            ...this.props.question,
            answers: [
                ...this.props.question.answers,
                a
            ]
        };

        this.props.save(q, this.props.index);
    }

    deleteAnswer = (id: number) => {
        const q: Question = {
            ...this.props.question,
            answers: this.props.question.answers
                .filter(a => a.id !== id)
                .map((item: Answer, index: number) => ({ ...item, sortorder: index }))
        };

        this.props.save(q, this.props.index);
    }

    shiftAnswer = (id: number, direction: number) => {
        const { answers } = this.props.question;

        let a = answers.find(item => item.id === id);

        if (!a || answers.length <= 1 || (a.sortorder === 0 && direction === -1) || (a.sortorder === answers.length - 1 && direction === 1)) {
            return;
        }

        const newSortOrder = a.sortorder + direction;

        let oldpos = answers.find(item => item.sortorder === newSortOrder);

        a.sortorder += direction;

        let newAnswers = answers.filter(answer => answer.id !== id);

        if (oldpos) {
            oldpos.sortorder += (direction * -1);
            const oldid = oldpos.id;
            newAnswers = newAnswers.filter(answer => answer.id !== oldid);
        }

        let q: Question = {
            ...this.props.question,
            answers: [...newAnswers, a]
        };

        if (oldpos) {
            q.answers.push(oldpos);
        }

        this.props.save(q, this.props.index);
    }

    saveAnswer = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { answers } = this.props.question;

        let a = answers.find(item => item.id === Number(event.currentTarget.name));

        if (!a) {
            return;
        }

        a.text = event.target.value;
        a.value = event.target.value;

        const q: Question = {
            ...this.props.question,
            answers: [
                ...answers.filter(answer => answer.id !== Number(event.currentTarget.name)),
                a
            ]
        };

        this.props.save(q, this.props.index);
    }

    renderAnswers = (): JSX.Element[] => this.props.question.answers.sort(this.answerSort).map((item: Answer, index: number) =>
        <div className="pure-u-1" key={index}>
            <div className="pure-u-2-24">
                <label htmlFor={`checkbox-item-${this.props.index}-${index}`}>{index + 1}</label>
            </div>
            <div className="pure-u-14-24">
                <input type="text"
                    id={`checkbox-item-${this.props.index}-${index}`}
                    name={`${item.id}`}
                    placeholder="Option Text..."
                    className="pure-u-11-12"
                    value={item.text}
                    onChange={this.saveAnswer} />
            </div>
            <div className="pure-u-8-24">
                <button
                    className="pure-button button-primary"
                    onClick={event => { event.preventDefault(); this.shiftAnswer(item.id, -1); }}
                    disabled={item.sortorder === 0}>
                    <Icon icon="arrow_upward" />
                </button>
                <button
                    className="pure-button button-primary"
                    onClick={event => { event.preventDefault(); this.shiftAnswer(item.id, 1); }}
                    disabled={item.sortorder === this.props.question.answers.length - 1}>
                    <Icon icon="arrow_downward" />
                </button>
                <button className="pure-button button-secondary" onClick={event => { event.preventDefault(); this.deleteAnswer(item.id); }}>
                    <Icon icon="delete" />
                </button>
            </div>
        </div>
    );

    render() {
        return (
            <fieldset>
                <legend>Checkboxes - Allows for multiple yes or no selections</legend>

                <label htmlFor={`box-${this.props.question.id}`}>
                    Please enter your question text
                </label>
                <input type="text"
                    name={`box-${this.props.question.id}`}
                    className="pure-u-23-24"
                    value={this.props.question.text}
                    onChange={this.handleChange}
                    placeholder="Enter question text..." />
                <div className="pure-g">
                    {this.renderAnswers()}
                </div>
                <div className="pure-control-group">
                    <button className="pure-button button-primary" onClick={this.addAnswer}>
                        <Icon icon="add" /> Add an answer
                    </button>
                </div>
            </fieldset>
        );
    }
}