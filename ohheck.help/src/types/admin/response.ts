import { ResponseAnswer } from '.';

export class Response {
    submissionid: number;
    questions: ResponseAnswer[];
    submitted: Date;

    constructor(json) {
        this.submissionid = json.submissionid;
        this.questions = json.questions.map(item => new ResponseAnswer(item));
        this.submitted = json.submitted;
    }
}