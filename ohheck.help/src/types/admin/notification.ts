import { ModelBase } from '../commontypes/modelbase';

export class Notification extends ModelBase {
    level: string;
    text: string;
    seen: boolean;
    action?: {
        type: string;
        location: string;
        text: string;
    }

    constructor(json) {
        super(json);

        this.level = json.level;
        this.text = json.text;
        this.seen = json.seen;

        if (json.action) {
            this.action = {
                type: json.action.type,
                location: json.action.location,
                text: json.action.text
            };
        }
    }
}