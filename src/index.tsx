import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Subunit from './components/subunit';
import Idol from './components/idol';
import 'whatwg-fetch';
import './scss/app.scss';

class App extends React.Component<any, any> {
    constructor() {
        super();

        this.state = {
            chosen: {}
        };
    }

    componentDidMount = () => {
        fetch("/api/cards")
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    cards: data
                });
            });
    }

    handleClick = id => {
        this.setState({
            chosen: {
                ...this.state.chosen,
                [id]: !this.state.chosen[id]
            }
        });
    }

    submit = () => {
        console.log('submitting', this.state.chosen);
        
        fetch('/api/submit', {
            method: 'POST',
            body: JSON.stringify(this.state.chosen),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(data => {
            //redirect or something
        });
    }

    renderList = list => {
        return list.map((item, index) => {
            return (
                <span key={index}>
                    <Idol
                        imageurl={item.imageurl}
                        rarity={item.rarity}
                        attribute={item.attribute}
                        selected={this.state.chosen[item.id]}
                        handleClick={() => this.handleClick(item.id)} 
                        name={item.id} />
                    <Idol
                        imageurl={item.idolized_imageurl}
                        rarity={item.rarity}
                        attribute={item.attribute}
                        selected={this.state.chosen[`${item.id}-idol`]} 
                        handleClick={() => this.handleClick(`${item.id}-idol`)} 
                        name={`${item.id}-idol`} />
                </span>
            );
        });
    }

    render() {
        const stuff = this.state.cards ? this.renderList(this.state.cards) : <p>Nothing to see here</p>;

        return (
            <div className="main pure-g">
                <div className="pure-u-1">
                    <h1>Oh Heck!</h1>
                    <p>
                        we're aki and chrissu and we need you to help us help you
                    </p>
                    <div>
                        {stuff}
                    </div>
                    <p className="center">
                        <button className="pure-button button-primary" onClick={this.submit}>
                            submit!
                        </button>
                    </p>
                </div>
                <footer className="pure-u-1">
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
