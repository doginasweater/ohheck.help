import { ModelBase } from '../commontypes/modelbase';
import { Card } from '../commontypes/card';
import { Question } from './question';
import { Submission } from './submission';

export class Survey extends ModelBase {
    name: string;
    title: string;
    active: boolean;
    comments: string;
    slug: string;
    questions: Question[];
    responses: Submission[];

    constructor(json) {
        super(json);

        this.name = json.name || '';
        this.title = json.title || '';
        this.active = json.active || false;
        this.comments = json.comments || '';
        this.slug = json.slug || '';
        this.questions = json.questions || [];
        this.responses = json.responses || [];
    }
}