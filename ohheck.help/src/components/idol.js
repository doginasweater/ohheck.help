import * as React from 'react';
export default class Idol extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (React.createElement("div", { className: "pure-u-1 pure-u-md-1-3 pure-u-lg-1-4 some-space center", onClick: this.props.handleClick },
            React.createElement("img", { src: this.props.imageurl, style: { width: '250px', height: '350px' } }),
            React.createElement("br", null),
            this.props.count ? React.createElement("span", null,
                React.createElement("b", null, "Count"),
                ": ",
                this.props.count) :
                React.createElement("button", { className: `pure-button ${this.props.selected ? 'button-primary' : 'button-secondary'}`, name: this.props.name }, this.props.selected ? 'selected' : 'pick me')));
    }
}
//# sourceMappingURL=idol.js.map