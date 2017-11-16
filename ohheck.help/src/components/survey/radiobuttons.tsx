import * as React from "react";
import { Question, Answer } from "types/admin";

export class RadioButtons extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    renderAnswers = () => this.props.answers.map(
        (item: Answer, index: number) =>
            <label htmlFor={this.props.id.toString()} key={Number(item.id)} className="pure-radio">
                <input type="radio" name={this.props.id.toString()} value={item.id} onChange={this.props.handleChange} /> {item.text}
            </label>)

    render(): JSX.Element {
        return (
            <div>
                <label htmlFor={this.props.id.toString()}>{this.props.text}</label>
                {this.renderAnswers()}
            </div>
        );
    }
}
