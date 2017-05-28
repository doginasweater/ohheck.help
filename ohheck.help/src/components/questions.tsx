import * as React from 'react';
import { Survey, Question } from '../types/admin';
import { SingleLineText, MultilineText, SelectBox, PublicCards } from './survey';
import { Cards } from './admin';


interface QuestionsProps {
    questions: Question[];
    ispublic: boolean;
    choices?: any;
    cards?: any;
    handleChange?: any;
    handleClick?: any;
}

export default class Questions extends React.Component<QuestionsProps, any> {
    constructor(props) {
        super(props);
    }

    renderQuestions = () => this.props.questions.map((item: Question, index: number) => {
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
