import { ModelBase } from '../commontypes/modelbase';
import { Idol } from '../commontypes/idol';
import { Subunit } from './subunit';

export class Group extends ModelBase {
    name: string;
    subunits: Subunit[];
    idols: Idol[];

    constructor(json) {
        super(json);

        this.name = json.name;
        this.subunits = json.subunits;
        this.idols = json.idols;
    }
}