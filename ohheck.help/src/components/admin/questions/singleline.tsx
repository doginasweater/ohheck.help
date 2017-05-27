import * as React from 'react';
import { Question } from '../../../types/admin';

export default class NewSingleLine extends React.Component<any, any> {
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
