import { ModelBase } from './modelbase';
import { Idol } from './idol';
 
export class Card extends ModelBase {
    gameid: number;
    rarity: string;
    attribute: string;
    imageurl: string;
    ispromo: boolean;
    isidol: boolean;
    idol?: Idol;

    constructor(json) {
        super(json);

        this.gameid = json.gameid;
        this.rarity = json.rarity;
        this.attribute = json.attribute;
        this.imageurl = json.imageurl;
        this.ispromo = json.ispromo;
        this.isidol = json.isidol;
        this.idol = json.idol;
    }
}
