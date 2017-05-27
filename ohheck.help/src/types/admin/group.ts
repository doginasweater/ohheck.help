import { Common } from '..';
import { Idol, Subunit } from '.';

export class Group extends Common {
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