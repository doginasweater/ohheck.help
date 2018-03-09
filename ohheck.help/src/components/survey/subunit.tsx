import * as React from 'react';
import { Link } from 'react-router-dom';

interface ISubunitProps {
    children: string[];
}

export default class Subunit extends React.Component<ISubunitProps, any> {
    constructor(props) {
        super(props);
    }

    public render() {
        let children: JSX.Element[] = [];

        if (this.props.children) {
            children = this.props.children.map((item, index) => {
                return <div className="pure-u-1-4" key={0}>{item}</div>;
            });
        }

        return (
            <div>
                <h2>aqours</h2>
                {children}
            </div>
        );
    }
}
