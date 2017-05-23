import * as React from 'react';
import 'whatwg-fetch';
import Idol from './idol';
export default class Survey extends React.Component {
    constructor(props) {
        super(props);
        this.componentDidMount = () => {
            fetch("/api/cards")
                .then(response => {
                return response.json();
            })
                .then(data => {
                this.setState({
                    cards: data
                });
            });
        };
        this.handleClick = id => {
            this.setState({
                chosen: Object.assign({}, this.state.chosen, { [id]: !this.state.chosen[id] })
            });
        };
        this.handleChange = event => {
            this.setState({
                [event.target.name]: event.target.value
            });
        };
        this.submit = event => {
            event.preventDefault();
            console.log('submitting', this.state.chosen);
            fetch('/api/submit', {
                method: 'POST',
                body: JSON.stringify({
                    surveyid: 1,
                    chosen: this.state.chosen,
                    comments: this.state.comments,
                    submitter: this.state.submitter,
                    nextgroup: this.state.nextgroup
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    return response.json();
                }
            }).then(data => {
                window.location.href = '/thanks';
            });
        };
        this.renderList = list => {
            return list.map((item, index) => {
                return (React.createElement("span", { key: index },
                    React.createElement(Idol, { imageurl: item.imageurl, rarity: item.rarity, attribute: item.attribute, selected: this.state.chosen[item.id], handleClick: () => this.handleClick(item.id), name: item.id })));
            });
        };
        this.state = {
            chosen: {},
            comments: '',
            submitter: '',
            nextgroup: ''
        };
    }
    render() {
        const stuff = this.state.cards ? this.renderList(this.state.cards) : React.createElement("p", null, "loading survey...");
        return (React.createElement("div", { className: "pure-u-1" },
            React.createElement("div", null, stuff),
            React.createElement("form", { name: "survey", className: "pure-form pure-form-stacked" },
                React.createElement("fieldset", null,
                    React.createElement("legend", null, "some extra stuff"),
                    React.createElement("label", { htmlFor: "comments" }, "do you have any comments or questions for us (totally optional)?"),
                    React.createElement("textarea", { name: "comments", value: this.state.comments, onChange: this.handleChange, className: "pure-u-1 pure-u-md-1-2 pure-u-lg-1-2" }),
                    React.createElement("label", { htmlFor: "submitter" }, "what is your name (totally optional)?"),
                    React.createElement("input", { type: "text", name: "submitter", value: this.state.submitter, onChange: this.handleChange, className: "pure-u-1 pure-u-md-1-2 pure-u-lg-1-4" }),
                    React.createElement("label", { htmlFor: "nextgroup" }, "which subunit would you like to vote on next?"),
                    React.createElement("select", { name: "nextgroup", value: this.state.nextgroup, onChange: this.handleChange, style: { 'height': 'auto' } },
                        React.createElement("option", { value: "" }, "Select one..."),
                        React.createElement("option", { value: "BiBi" }, "BiBi"),
                        React.createElement("option", { value: "lily white" }, "lily white"),
                        React.createElement("option", { value: "Printemps" }, "Printemps"),
                        React.createElement("option", { value: "Guilty Kiss" }, "Guilty Kiss"),
                        React.createElement("option", { value: "AZALEA" }, "AZALEA")),
                    React.createElement("p", { className: "center" },
                        React.createElement("button", { className: "pure-button button-primary", onSubmit: this.submit, onClick: this.submit }, "submit!"))))));
    }
}
//# sourceMappingURL=survey.js.map