import { Common, Choice } from '..';

export class Submission extends Common {
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
