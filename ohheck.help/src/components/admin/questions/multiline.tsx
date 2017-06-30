import * as React from 'react';
import { Question } from 'types/admin';

interface NewMultiLineProps {
    question: Question;
    save: (question: Question, index: number) => void;
    index: number;
}

export default class NewMultiline extends React.Component<NewMultiLineProps, any> {
    constructor(props) {
        super(props);
    }

    handleChange = event => {
        let q: Question = {
            ...this.props.question,
            type: 'MultiLineText',
            text: event.target.value
        };

        this.props.save(q, this.props.index);
    }

    render() {
        return (
            <fieldset>
                <legend>Multi Line Text</legend>

                <label htmlFor={`box-${this.props.question.id}`}>
                    What do you want your multi line response question to say?
                </label>
                <input
                    type="text"
                    name={`box-${this.props.question.id}`}
                    className="pure-u-22-24"
                    onChange={this.handleChange}
                    value={this.props.question.text}
                    placeholder="Enter question text..." />
            </fieldset>
        );
    }
}