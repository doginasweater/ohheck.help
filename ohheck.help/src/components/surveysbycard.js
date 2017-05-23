import * as React from 'react';
import Idol from './idol';
export default class SurveysByCard extends React.Component {
    constructor(props) {
        super(props);
        this.componentDidMount = () => {
            fetch('/admin/surveysbycard')
                .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
                .then(data => {
                this.setState({
                    responses: data
                });
            });
        };
        this.renderList = list => list.map((item, index) => React.createElement(Idol, { imageurl: item.imageurl, rarity: item.rarity, attribute: item.attribute, name: item.id, count: item.count, key: item.id }));
        this.state = {};
    }
    render() {
        const body = this.state.responses ? this.renderList(this.state.responses) : React.createElement("div", null, "Loading...");
        return (React.createElement("div", { className: "pure-u-1" },
            React.createElement("h3", null, "surveys by card"),
            React.createElement("div", { className: "pure-u-1" }, body)));
    }
}
//# sourceMappingURL=surveysbycard.js.map