import { ModelBase } from '../commontypes/modelbase';
import { Answer } from 'types/admin';

export class Question extends ModelBase {
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