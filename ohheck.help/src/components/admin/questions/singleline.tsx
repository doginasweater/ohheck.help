import * as React from 'react';
import { Question } from '../../../types/admin';

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
        let q: Question = { ...this.props.question };
        q.type = 'SingleLineText';
        q.text = event.target.value;

        this.props.save(q, this.props.index);
    }

    render() {
        return (
            <fieldset>
                <legend>Single Line Text</legend>
                
                <label htmlFor="box">What do you want your single line question to say?</label>
                <input type="text" name="box" className="pure-u-3-4" value={this.props.question.text} onChange={this.handleChange} />
            </fieldset>
        );
    }
}
