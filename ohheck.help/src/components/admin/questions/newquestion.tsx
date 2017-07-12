import * as React from 'react';
import { AnswerTypes, AnswerType, Question } from 'types/admin';
import { CardChooser, Checkboxes, NewMultiline, NewRadioButtons, NewSelectBox, NewSingleLine } from '.';
import { Icon } from 'components/common';

interface NewQuestionProps {
    question: Question;
    index: number;
    save: (question: Question, index: number) => void;
    deleteQuestion: (event: React.FormEvent<HTMLButtonElement>) => void;
    numquestions: number;
    shiftQuestion: (Question, Index, Direction) => void;
}

export default class NewQuestion extends React.Component<NewQuestionProps, any> {
    constructor(props) {
        super(props);
    }

    handleChange = event => {
        let newq = this.props.question;

        newq.type = event.target.value;

        this.props.save(newq, this.props.index);
    }

    renderOptions = (): JSX.Element[] => AnswerTypes.map(
        (item: string, index: number) => <option value={item} key={index}>{item}</option>
    );

    renderQuestion = () => {
        switch (this.props.question.type) {
            case 'Cards':
                return <CardChooser
                    question={this.props.question}
                    index={this.props.index}
                    save={this.props.save} />;
            case 'MultiLineText':
                return <NewMultiline
                    question={this.props.question}
                    index={this.props.index}
                    save={this.props.save} />;
            case 'SingleLineText':
                return <NewSingleLine
                    question={this.props.question}
                    index={this.props.index}
                    save={this.props.save} />;
            case 'SelectBox':
                return <NewSelectBox
                    question={this.props.question}
                    index={this.props.index}
                    save={this.props.save} />;
            case 'RadioButtons':
                return <NewRadioButtons
                    question={this.props.question}
                    index={this.props.index}
                    save={this.props.save} />;
            case 'Checkbox':
                return <Checkboxes
                    question={this.props.question}
                    index={this.props.index}
                    save={this.props.save} />;
            default:
                return <div>unknown!</div>;
        }
    }

    moveQuestion = (dir: string): void => {
        const up = dir === 'up';

        const newq: Question = {
            ...this.props.question,
            sortorder: up ? this.props.question.sortorder - 1 : this.props.question.sortorder + 1
        };

        this.props.shiftQuestion(newq, this.props.index, up);
    }

    renderMoveButtons = (question: Question): JSX.Element[] => {
        const up =
            <button className="pure-button button-primary" onClick={e => { e.preventDefault(); this.moveQuestion('up'); }} key={0}>
                <Icon icon="arrow_upward" />
            </button>;

        const down =
            <button className="pure-button button-primary" onClick={e => { e.preventDefault(); this.moveQuestion('down'); }} key={1}>
                <Icon icon="arrow_downward" />
            </button>;

        let buttons: JSX.Element[] = [];

        if (question.sortorder > 1) {
            buttons.push(up);
        }

        if (question.sortorder < this.props.numquestions) {
            buttons.push(down);
        }

        return buttons;
    }

    render() {
        if (!this.props.question.type) {
            return (
                <div className="pure-control-group">
                    <label htmlFor="answertype">Type</label>
                    <select name="answertype" value={this.props.question.type} onChange={this.handleChange}>
                        <option value="">Select One</option>
                        {this.renderOptions()}
                    </select>
                </div>
            );
        }

        return (
            <div className="pure-u-1">
                <div className="pure-u-3-4">
                    {this.renderQuestion()}
                </div>
                <div className="pure-u-1-4">
                    <div className="new-question-options">
                        <div className="legend-fake">Options</div>
                        <div className="pure-u-1">
                            <table className="pure-table pure-table-horizontal compact-table">
                                <thead>
                                    <tr>
                                        <th colSpan={2}> </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <b>Sort Order</b>
                                        </td>
                                        <td>
                                            {this.props.question.sortorder}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>Required</b>
                                        </td>
                                        <td className="align-icon">
                                            {this.props.question.type === 'Cards' ? 'Yes' : 'No' }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>Move</b>
                                        </td>
                                        <td>
                                            {this.renderMoveButtons(this.props.question)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>Delete</b>
                                        </td>
                                        <td>
                                            <button className="pure-button button-secondary" onClick={this.props.deleteQuestion} id={this.props.question.id.toString()}>
                                                <i className="material-icons">delete</i> Delete
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}