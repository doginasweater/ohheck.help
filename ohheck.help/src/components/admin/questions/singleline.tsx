import * as React from 'react';
import { Question } from '../../../types/admin';

export default class NewSingleLine extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            box: ''
        };
    }

    handleSave = event => {
        event.preventDefault();

        let q: Question = { ...this.props.question };
        q.type = 'SingleLineText';
        q.text = this.state.box;

        this.props.save(q, this.props.index);
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <span>
                <label htmlFor="box">What do you want your single line question to say?</label>
                <input type="text" name="box" className="pure-u-3-4" value={this.state.box} onChange={this.handleChange} />
                <button onClick={this.handleSave} className="pure-button button-primary">
                    Save
                </button>
            </span>
        );
    }
}
