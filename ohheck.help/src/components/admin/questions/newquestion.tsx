import * as React from 'react';
import { AnswerTypes } from '../../../types/admin';
import { CardChooser, Checkboxes, NewMultiline, NewRadioButtons, NewSelectBox, NewSingleLine } from '.';

export default class NewQuestion extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            answertype: ''
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    renderOptions = () => AnswerTypes.map(
        (item, index) => <option value={item} key={index}>{item}</option>
    );

    renderQuestion = () => {
        switch (this.state.answertype) {
            case 'Cards':
                return <CardChooser
                    question={this.props.question}
                    index={this.props.index}
                    save={this.props.save} />;
            case 'MultiLineText':
                return <NewMultiline
                    question={this.props.question}
                    index={this.props.index}
                    save={this.props.save} />;
            case 'SingleLineText':
                return <NewSingleLine
                    question={this.props.question}
                    index={this.props.index}
                    save={this.props.save} />;
            case 'SelectBox':
                return <NewSelectBox
                    question={this.props.question}
                    index={this.props.index}
                    save={this.props.save} />;
            case 'RadioButtons':
                return <NewRadioButtons
                    question={this.props.question}
                    index={this.props.index}
                    save={this.props.save} />;
            case 'Checkbox':
                return <Checkboxes
                    question={this.props.question}
                    index={this.props.index}
                    save={this.props.save} />;
            default:
                return <div>unknown!</div>;
        }
    }

    render() {
        if (!this.state.answertype) {
            return (
                <div>
                    <label htmlFor="answertype">Please choose a question type</label>
                    <select name="answertype" value={this.state.answertype} onChange={this.handleChange} style={{ 'height': 'auto' }}>
                        <option value="">Select One</option>
                        {this.renderOptions()}
                    </select>
                </div>
            );
        } else {
            return (
                <div className="pure-u-1">
                    <div className="pure-u-3-4">
                        {this.renderQuestion()}
                    </div>
                    <div className="pure-u-1-4">
                        <div className="pure-u-1">
                            Sort Order: {this.props.question.id}
                        </div>
                        <div className="pure-u-1">
                            <button onClick={this.props.deleteQuestion} className="pure-button button-secondary" id={this.props.question.id}>
                                <i className="material-icons md-18">delete</i> Delete me
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
    }
}