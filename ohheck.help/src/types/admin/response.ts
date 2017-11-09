import { ResponseAnswer } from '.';

export class Response {
    submissionid: number;
    questions: ResponseAnswer[];
    submitted: Date;
    questiontext: string[];

    constructor(json) {
        this.submissionid = json.submissionid;
        this.questions = json.questions.map(item => new ResponseAnswer(item));
        this.submitted = json.submitted;
        this.questiontext = json.questiontext;
    }
}