﻿import * as React from 'react';
import { Question } from 'types/admin';

export default class SingleLineText extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    public render() {
        return (
            <div>
                <label htmlFor={this.props.id.toString()}>
                    {this.props.text}
                    {this.props.required && <span style={{ color: 'red' }}> (required)</span>}
                </label>
                <input
                    type="text"
                    name={this.props.id.toString()}
                    className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-4"
                    value={this.props.choices[this.props.id] ? this.props.choices[this.props.id].choice : ''}
                    onChange={this.props.handleChange}
                />
            </div>
        );
    }
}
