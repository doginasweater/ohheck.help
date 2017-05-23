import * as React from 'react';
import 'whatwg-fetch';
export default class Responses extends React.Component {
    constructor(props) {
        super(props);
        this.componentDidMount = () => {
            fetch('/admin/responses')
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
        this.renderList = list => list.map((item, index) => React.createElement("tr", { key: index },
            React.createElement("td", null, item.submitted),
            React.createElement("td", null, item.submitter),
            React.createElement("td", null, item.comments),
            React.createElement("td", null, item.nextgroup),
            React.createElement("td", null, item.cards)));
        this.state = {};
    }
    render() {
        const body = this.state.responses ? this.renderList(this.state.responses) : React.createElement("tr", null,
            React.createElement("td", null, "Loading..."));
        return (React.createElement("div", { className: "pure-u-1" },
            React.createElement("h3", null, "responses"),
            React.createElement("table", { className: "pure-table pure-table-striped pure-table-horizontal" },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", null, "Submitted"),
                        React.createElement("th", null, "Submitter"),
                        React.createElement("th", null, "Comments"),
                        React.createElement("th", null, "Next Group"),
                        React.createElement("th", null, "Cards"))),
                React.createElement("tbody", null, body))));
    }
}
//# sourceMappingURL=responses.js.map