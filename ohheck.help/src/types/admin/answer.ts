import { Common, Card } from '..';

export class Answer extends Common {
    text: string;
    value: string;
    sortorder: number;
    cards?: Card[];

    constructor(json) {
        super(json);

        this.text = json.text;
        this.value = json.value;
        this.sortorder = json.sortorder;
        this.cards = json.cards;
    }
}