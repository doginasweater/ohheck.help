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

        this.state = {
            box: ''
        };
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

                <label htmlFor="box">What do you want your multi line question to say?</label>
                <input type="text" name="box" className="pure-u-3-4" onChange={this.handleChange} value={this.props.question.text} />
            </fieldset>
        );
    }
}