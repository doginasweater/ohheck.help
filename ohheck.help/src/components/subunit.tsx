import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Subunit extends React.Component<any, any> {
    constructor() {
        super();
    }

    render() {
	let children = this.props.children.map((item, index) => {
		return (
		    <div className="pure-u-1-4">
			{item}
		    </div>
		);
	});
        return (
            <div>
                <h2>aqours</h2>
		{children}
		<div className="pure-u-1-4">
		    i am the code god. it's like google docs but shittier
		</div>
            </div>
        )
    }
}
