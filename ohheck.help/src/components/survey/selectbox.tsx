import * as React from "react";
import { Question, Answer } from "types/admin";

export default class SelectBox extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    renderAnswers = () => this.props.answers.map(
        (item: Answer, index: number) =>
            <option value={item.id} key={index}>
                {item.text}
            </option>
    )

    render(): JSX.Element {
        return (
            <div>
                <label htmlFor={this.props.id.toString()}>{this.props.text}</label>
                <select
                    name={this.props.id.toString()}
                    style={{ "height": "auto" }}
                    onChange={this.props.handleChange}
                    value={this.props.choices[this.props.id]}>
                    <option value="">Select One</option>
                    {this.renderAnswers()}
                </select>
            </div>
        );
    }
}
