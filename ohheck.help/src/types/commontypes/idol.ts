import { ModelBase } from './modelbase';
import { Card } from './card';
import { Group, Subunit } from 'types/admin';

export class Idol extends ModelBase {
    name: string;
    group: Group | null;
    subunit: Subunit | null;
    cards: Card[] | null;

    constructor(json) {
        super(json);

        this.name = json.name;
        this.group = json.group ? new Group(json.group) : null;
        this.subunit = json.subunit ? new Subunit(json.subunit) : null;
        this.cards = json.cards ? json.cards.map(item => new Card(item)) : [];
    }
}