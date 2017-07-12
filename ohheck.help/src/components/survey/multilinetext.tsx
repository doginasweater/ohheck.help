import * as React from 'react';
import { Question } from 'types/admin';

export default class MultilineText extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <label htmlFor={this.props.id.toString()}>{this.props.text}</label>
                <textarea
                    name={this.props.id.toString()}
                    onChange={this.props.handleChange}
                    value={this.props.choices[this.props.id]}
                    className="pure-u-1 pure-u-md-1-2 pure-u-lg-1-2" />
            </div>
        );
    }
}
