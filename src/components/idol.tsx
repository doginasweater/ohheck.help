import * as React from 'react';

export default class Idol extends React.Component<any, any> {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="pure-u-1">
                <img src="http://placehold.it/250x350" /><br />
	        <p>this is an idol</p>
	        <p>kitten has some stats i guess</p>
                <button className="pure-button button-primary">pick me</button>
            </div>
        )
    }
}