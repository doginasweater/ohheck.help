import * as React from 'react';
import { Answer, Question } from 'types/admin';

export class Checkboxes extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public renderAnswers = () => this.props.answers.map(
        (item: Answer, index: number) =>
            <label htmlFor={this.props.id.toString()} key={Number(item.id)} className="pure-checkbox">
                <input
                    type="checkbox"
                    name={this.props.id.toString()}
                    value={item.value}
                    onClick={event => this.props.handleChange(this.props.id.toString(), item.id.toString(), !item.value)}
                /> {item.text}
            </label>)

    public render(): JSX.Element {
        return (
            <div>
                <label htmlFor={this.props.id.toString()}>
                    {this.props.text}
                    {this.props.required && <span style={{ color: 'red' }}> (required)</span>}
                </label>
                {this.renderAnswers()}
            </div>
        );
    }
}
