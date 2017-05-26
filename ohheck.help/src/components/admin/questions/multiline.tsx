import * as React from 'react';

export default class NewMultiline extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <span>
                <label htmlFor="box">What do you want your multi line question to say?</label>
                <input type="text" name="box" className="pure-u-3-4" />
            </span>
        );
    }
}