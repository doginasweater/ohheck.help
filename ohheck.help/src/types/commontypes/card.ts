import { ModelBase } from './modelbase';

export class Card extends ModelBase {
    gameid: number;
    rarity: string;
    attribute: string;
    imageurl: string;
    ispromo: boolean;
    isidol: boolean;

    constructor(json) {
        super(json);

        this.gameid = json.gameid;
        this.rarity = json.rarity;
        this.attribute = json.attribute;
        this.imageurl = json.imageurl;
        this.ispromo = json.ispromo;
        this.isidol = json.isidol;
    }
}
