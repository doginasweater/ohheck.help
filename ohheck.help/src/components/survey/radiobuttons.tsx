import * as React from 'react';
import { Answer, Question } from 'types/admin';

export class RadioButtons extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public renderAnswers = () => this.props.answers.map(
        (item: Answer, index: number) =>
            <label htmlFor={this.props.id.toString()} key={Number(item.id)} className="pure-radio">
                <input type="radio" name={this.props.id.toString()} value={item.id} onChange={this.props.handleChange} /> {item.text}
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
