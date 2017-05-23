import * as React from 'react';
export default class Subunit extends React.Component {
    constructor() {
        super();
    }
    render() {
        let children = this.props.children.map((item, index) => {
            return (React.createElement("div", { className: "pure-u-1-4" }, item));
        });
        return (React.createElement("div", null,
            React.createElement("h2", null, "aqours"),
            children,
            React.createElement("div", { className: "pure-u-1-4" }, "i am the code god. it's like google docs but shittier")));
    }
}
//# sourceMappingURL=subunit.js.map