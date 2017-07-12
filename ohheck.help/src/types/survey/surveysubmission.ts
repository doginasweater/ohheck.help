export class SurveySubmission {
    surveyid: number;
    choices: Map<number, string>;
    cards: Map<number, boolean>;

    constructor(data) {
        this.surveyid = data.surveyid;
        this.choices = data.choices;
        this.cards = data.cards;
    }
}