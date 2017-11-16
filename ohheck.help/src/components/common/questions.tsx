import * as React from 'react';
import { Survey, Question } from 'types/admin';
import { SingleLineText, MultilineText, SelectBox, PublicCards, RadioButtons, Checkboxes } from 'components/survey';
import { Cards } from 'components/common';

interface QuestionsProps {
    questions: Question[];
    ispublic: boolean;
    choices?: any;
    cards?: any;
    handleChange: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    handleCheckbox: (questionid: string, answerid: string, value: boolean) => void;
    handleClick: (id: number) => void;
}

export class Questions extends React.Component<QuestionsProps, any> {
    constructor(props) {
        super(props);
    }

    renderQuestions = (): JSX.Element[] => this.props.questions.map((item: Question, index: number) => {
        switch (item.type) {
            case 'SingleLineText':
                return <SingleLineText
                    {...item}
                    choices={this.props.choices}
                    handleChange={this.props.handleChange}
                    key={index} />;
            case 'MultiLineText':
                return <MultilineText
                    {...item}
                    choices={this.props.choices}
                    handleChange={this.props.handleChange}
                    key={index} />;
            case 'SelectBox':
                return <SelectBox
                    {...item}
                    choices={this.props.choices}
                    handleChange={this.props.handleChange}
                    key={index} />;
            case 'RadioButtons':
                return <RadioButtons
                    {...item}
                    choices={this.props.choices}
                    handleChange={this.props.handleChange}
                    key={index} />;
            case 'Checkbox':
                return <Checkboxes
                    {...item}
                    choices={this.props.choices}
                    handleChange={this.props.handleCheckbox}
                    key={index} />;
            case 'Cards':
                if (this.props.ispublic) {
                    return <PublicCards
                        {...item.answers[0]}
                        handleClick={this.props.handleClick}
                        choices={this.props.cards}
                        key={index} />;
                } else {
                    return <Cards {...item} key={index} />;
                }
            default:
                console.error('unknown question type:', item.type);

                return <div>Unknown question type</div>;
        }
    });

    render() {
        return (
            <div>
                {this.renderQuestions()}
            </div>
        );
    }
}
