export class ResponseByCard {
    count: number;
    imageurl: string;
    id: number;

    constructor(json) {
        this.count = json.count;
        this.imageurl = json.imageurl;
        this.id = json.id;
    }
}