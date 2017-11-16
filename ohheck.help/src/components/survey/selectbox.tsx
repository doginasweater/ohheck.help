import * as React from 'react';
import { Answer, Question } from 'types/admin';

export default class SelectBox extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public renderAnswers = () => this.props.answers.map(
        (item: Answer, index: number) =>
            <option value={item.id} key={index}>
                {item.text}
            </option>)

    public render(): JSX.Element {
        return (
            <div>
                <label htmlFor={this.props.id.toString()}>
                    {this.props.text}
                    {this.props.required && <span style={{ color: 'red' }}> (required)</span>}
                </label>
                <select
                    name={this.props.id.toString()}
                    style={{ height: 'auto' }}
                    onChange={this.props.handleChange}
                    value={this.props.choices[this.props.id] ? this.props.choices[this.props.id].choice : ''}>
                    <option value="">Select One</option>
                    {this.renderAnswers()}
                </select>
            </div>
        );
    }
}
