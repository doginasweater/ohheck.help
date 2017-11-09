export class ResponseAnswer {
    id: number;
    question: number;
    text?: string;
    cards: string;
    selections: any[];
    submissionid: number;
    submitted: Date;
    answer: string;
    type: string;

    constructor(json) {
        this.id = json.id;
        this.question = json.question;
        this.cards = json.cards;
        this.selections = json.selections;
        this.text = json.text;
        this.submissionid = json.submissionid;
        this.submitted = json.submitted;
        this.answer = json.answer;
        this.type = json.type;
    }
}