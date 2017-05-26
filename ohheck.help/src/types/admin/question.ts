import { Common } from '..';
import { Answer } from './answer';

export class Question extends Common {
    text: string;
    type: string;
    sortorder: number;
    answers: Answer[];

    constructor(json) {
        super(json);

        this.text = json.text;
        this.type = json.type;
        this.sortorder = json.sortorder;
        this.answers = json.answers;
    }
}