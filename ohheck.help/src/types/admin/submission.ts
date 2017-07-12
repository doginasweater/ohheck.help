import { ModelBase } from '../commontypes/modelbase';
import { Choice } from '../commontypes/choice';

export class Submission extends ModelBase {
    survey: number;
    submitter: string;
    choices: Choice[];

    constructor(json) {
        super(json);

        this.survey = json.survey;
        this.submitter = json.submitter;
        this.choices = json.choices;
    }
}
