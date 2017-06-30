import { Common, Card } from '..';
import { Group, Subunit } from '.';

export class Idol extends Common {
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