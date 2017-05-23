import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/home';
import Admin from './components/admin';
import Thanks from './components/thanks';
import './scss/app.scss';
class App extends React.Component {
    render() {
        return (React.createElement(Router, null,
            React.createElement("div", { className: "main pure-g" },
                React.createElement("div", { className: "pure-u-1" },
                    React.createElement("div", { className: "pull-right" },
                        React.createElement("a", { href: "https://twitter.com/akikkyu", target: "_blank" }, "aki's twitter"),
                        " |\u00A0",
                        React.createElement("a", { href: "https://akikkyu.tumblr.com", target: "_blank" }, "aki's tumblr"),
                        " | \u00A0",
                        React.createElement("a", { href: "https://twitter.com/chrissuwa", target: "_blank" }, "chrissu's twitter"),
                        " | \u00A0",
                        React.createElement("a", { href: "https://nemui-mo.tumblr.com", target: "_blank" }, "chrissu's tumblr"),
                        " | \u00A0",
                        React.createElement("a", { href: "https://youtube.com/c/OhHeck", target: "_blank" }, "youtube channel!"))),
                React.createElement(Route, { exact: true, path: "/", component: Home }),
                React.createElement(Route, { path: "/thanks", component: Thanks }),
                React.createElement(Route, { path: "/dashboard", component: Admin }),
                React.createElement("footer", { className: "pure-u-1" },
                    React.createElement("div", { className: "pull-right small" },
                        "\u00A9 2017 - Oh Heck Enterprises. site by ",
                        React.createElement("a", { target: "_blank", href: "https://github.com/myopicmage/ohheck.help" }, "a dog in a sweater"),
                        ". idol data provided by ",
                        React.createElement("a", { href: "http://schoolido.lu", target: "_blank" }, "schoolido.lu"))))));
    }
}
if (module.hot) {
    module.hot.accept();
}
ReactDOM.render(React.createElement(App, null), document.getElementById("react-root"));
//# sourceMappingURL=index.js.map