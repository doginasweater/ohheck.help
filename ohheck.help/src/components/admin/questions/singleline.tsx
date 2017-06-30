import * as React from 'react';
import { Question } from 'types/admin';

interface NewSingleLineProps {
    question: Question;
    save: (question: Question, index: number) => void;
    index: number;
}

export default class NewSingleLine extends React.Component<NewSingleLineProps, any> {
    constructor(props) {
        super(props);
    }

    handleChange = event => {
        const q: Question = {
            ...this.props.question,
            type: 'SingleLineText',
            text: event.target.value
        };

        this.props.save(q, this.props.index);
    }

    render() {
        return (
            <fieldset>
                <legend>Single Line Text</legend>
                
                <label htmlFor={`box-${this.props.question.id}`}>
                    What do you want your single line response question to say?
                </label>

                <input
                    type="text"
                    name={`box-${this.props.question.id}`}
                    className="pure-u-22-24"
                    value={this.props.question.text}
                    onChange={this.handleChange}
                    placeholder="Enter question text..." />
            </fieldset>
        );
    }
}
