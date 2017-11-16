import * as React from "react";
import { Question, Answer } from "types/admin";

export class Checkboxes extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    renderAnswers = () => this.props.answers.map(
        (item: Answer, index: number) =>
            <label htmlFor={this.props.id.toString()} key={Number(item.id)} className="pure-checkbox">
                <input type="checkbox"
                    name={this.props.id.toString()}
                    value={item.value}
                    onClick={event => this.props.handleChange(this.props.id.toString(), item.id.toString(), !item.value)} /> {item.text}
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
