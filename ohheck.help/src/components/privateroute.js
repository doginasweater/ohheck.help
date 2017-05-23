var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import { Route } from 'react-router';
export default (_a) => {
    var { component: Component } = _a, rest = __rest(_a, ["component"]);
    const makeRender = props => {
        if (props.authenticated) {
            return React.createElement(Component, Object.assign({}, props));
        }
        else {
            window.location.href = '/account/login';
        }
    };
    return React.createElement(Route, Object.assign({}, rest, { render: props => makeRender(props) }));
};
//# sourceMappingURL=privateroute.js.map