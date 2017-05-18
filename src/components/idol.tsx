import * as React from 'react';

export default class Idol extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="pure-u-1 pure-u-md-1-3 pure-u-lg-1-4 some-space center" onClick={this.props.handleClick}>
                <img src={this.props.imageurl} style={{ width: '250px', height: '350px' }} />
                <br />
                {this.props.count ? <span><b>Count</b>: {this.props.count}</span> :
                    <button
                        className={`pure-button ${this.props.selected ? 'button-primary' : 'button-secondary'}`}
                        name={this.props.name}>
                        {this.props.selected ? 'selected' : 'pick me'}
                    </button>}
            </div>
        )
    }
}