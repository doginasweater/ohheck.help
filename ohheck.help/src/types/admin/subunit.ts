import { Common } from '..';
import { Idol } from '.';

export class Subunit extends Common {
    name: string;
    idols?: Idol[];

    constructor(json) {
        super(json);

        this.name = json.name;
        this.idols = json.idols ? json.idols.map(item => new Idol(item)) : [];
    }
}