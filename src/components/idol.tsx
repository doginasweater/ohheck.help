import * as React from 'react';

export default class Idol extends React.Component<any, any> {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="pure-u-1">
                <div className="pure-u-1-4">
                    <img src="http://placehold.it/150x150" />
                </div>
                <div className="pure-u-1-2">
                    <div className="pure-u-1">
                        <p>this is an idol</p>
                    </div>
                    <div className="pure-u-1">
                        <p>kitten has some stats i guess</p>
                    </div>
                </div>
                <div className="pure-u-1-4">
                    <button className="pure-button button-primary">pick me</button>
                </div>
            </div>
        )
    }
}