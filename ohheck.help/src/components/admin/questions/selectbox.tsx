import * as React from 'react';
import { Question } from 'types/admin';

interface NewSelectBoxProps {
    question: Question;
    save: (question: Question, index: number) => void;
    index: number;
}

export default class NewSelectBox extends React.Component<NewSelectBoxProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3>please select how much of a nerd you are: 1. very 2. extremely 3. you wrote a fucking form builder</h3>
            </div>
        );
    }
}
