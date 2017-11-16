import { Answer } from 'types/admin';
import { ModelBase } from '../commontypes/modelbase';

export class Question extends ModelBase {
    public text: string;
    public type: string;
    public sortorder: number;
    public answers: Answer[];
    public required: boolean;

    constructor(json) {
        super(json);

        this.text = json.text;
        this.type = json.type;
        this.sortorder = json.sortorder;
        this.answers = json.answers;
        this.required = json.required;
    }
}
