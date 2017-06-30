import * as React from 'react';
import { Question } from 'types/admin';

interface NewRadioButtonsProps {
    question: Question;
    save: (question: Question, index: number) => void;
    index: number;
}

export default class NewRadioButtons extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3>rrrrrrrradio buttons!</h3>
            </div>
        );
    }
}
