import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Home from './components/home';
import Admin from './components/admin';
import Thanks from './components/thanks';
import PrivateRoute from './components/privateroute';
import './scss/app.scss';

class App extends React.Component<any, any> {
    render() {
        return (
            <Router>
                <div className="main pure-g">
                    <div className="pure-u-1">
                        <div className="pull-right">
                            <a href="https://twitter.com/akikkyu" target="_blank">aki's twitter</a> |&nbsp;
                        <a href="https://akikkyu.tumblr.com" target="_blank">aki's tumblr</a> | &nbsp;
                        <a href="https://twitter.com/chrissuwa" target="_blank">chrissu's twitter</a> | &nbsp;
                        <a href="https://nemui-mo.tumblr.com" target="_blank">chrissu's tumblr</a> | &nbsp;
                        <a href="https://youtube.com/c/OhHeck" target="_blank">youtube channel!</a>
                        </div>
                    </div>
                    <Route exact path="/" component={Home} />
                    <Route path="/thanks" component={Thanks} />
                    <Route path="/dashboard" component={Admin} />
                    <footer className="pure-u-1">
                        <div className="pull-right small">
                            &copy; 2017 - Oh Heck Enterprises. site by <a target="_blank" href="https://github.com/myopicmage/ohheck.help">a dog in a sweater</a>.
                    </div>
                    </footer>
                </div>
            </Router>
        );
    }
}

if (module.hot) {
    module.hot.accept();
}

ReactDOM.render(<App />, document.getElementById("react-root"));
