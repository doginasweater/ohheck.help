import { ModelBase } from '../commontypes/modelbase';
import { Idol } from '../commontypes/idol';

export class Subunit extends ModelBase {
    name: string;
    idols?: Idol[];

    constructor(json) {
        super(json);

        this.name = json.name;
        this.idols = json.idols ? json.idols.map(item => new Idol(item)) : [];
    }
}