import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Subunit from './components/subunit';
import Idol from './components/idol';
import './scss/app.scss';

class App extends React.Component<any, any> {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="main pure-g">
                <div className="pure-u-sm-1">
                    <h1>Oh Heck!</h1>
                    <p>
                        we're aki and chrissu and we need you to help us help you
                    </p>
                    <Subunit>
                        <Idol />
                        <Idol />
                        <Idol />
			<Idol />
                    </Subunit>
                    <p className="center">
                        <button className="pure-button button-primary">oh god</button>
                        <button className="pure-button button-secondary">hecking</button>
                    </p>
                </div>
                <footer className="pure-u-sm-1">
                    <div className="pull-right small">
                        &copy; 2017 - Oh Heck Enterprises
                    </div>
                </footer>
            </div>
        );
    }
}

if (module.hot) {
    module.hot.accept();
}

ReactDOM.render(<App />, document.getElementById("react-root"));
