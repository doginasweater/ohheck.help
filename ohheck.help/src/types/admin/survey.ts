import { Common } from '..';
import { Question } from '.';
import { Submission } from '.';

export class Survey extends Common {
    name: string;
    title: string;
    active: boolean;
    comments: string;
    slug: string;
    questions: Question[];
    responses: Submission[];

    constructor(json) {
        super(json);

        this.name = json.name;
        this.title = json.title;
        this.active = json.active;
        this.comments = json.comments;
        this.slug = json.slug;
        this.questions = json.questions;
        this.responses = json.responses;
    }
}