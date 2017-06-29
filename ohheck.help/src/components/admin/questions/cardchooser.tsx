import * as React from 'react';
import { Question } from '../../../types/admin';

interface CardChooserProps {
    question: Question;
    save: (question: Question, index: number) => void;
    index: number;
}

export default class CardChooser extends React.Component<CardChooserProps, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h3>card chooser goes here</h3>
            </div>
        );
    }
}
