export class SurveySubmission {
    surveyid: number;
    choices: { [id: number]: { [id: number]: string }; }
    cards: { [id: number]: boolean; }

    constructor(data) {
        this.surveyid = data.surveyid;
        this.choices = data.choices;
        this.cards = data.cards;
    }
}