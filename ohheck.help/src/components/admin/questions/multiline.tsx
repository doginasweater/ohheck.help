import * as React from 'react';
import { Question } from '../../../types/admin';

export default class NewMultiline extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            box: ''
        };
    }

    handleChange = event => {
        let q: Question = { ...this.props.question };
        q.type = 'MultiLineText';
        q.text = event.target.value;

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