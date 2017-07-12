import { ModelBase } from '../commontypes/modelbase';
import { Card } from '../commontypes/card';

export class Answer extends ModelBase {
    text: string;
    value: string;
    sortorder: number;
    cards: Card[] | null;

    constructor(json) {
        super(json);

        this.text = json.text;
        this.value = json.value;
        this.sortorder = json.sortorder;
        this.cards = json.cards;
    }
}