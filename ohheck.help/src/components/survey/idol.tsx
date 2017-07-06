import * as React from 'react';
import { connect } from 'react-redux';

@connect(state => ({ form: state.survey }))
export default class Idol extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        const { cards } = this.props.form;
        const selected = cards[this.props.name];

        return (
            <div className="pure-u-1 pure-u-md-1-3 pure-u-lg-1-4 some-space center fade-in" onClick={this.props.handleClick}>
                <img src={this.props.imageurl} style={{ width: '250px', height: '350px' }} />
                <br />
                {this.props.count ? <span><b>Count</b>: {this.props.count}</span> :
                    <button
                        className={`pure-button ${selected ? 'button-primary' : 'button-secondary'}`}
                        name={this.props.name}
                        onClick={event => event.preventDefault()}>
                        {selected ? 'selected' : 'pick me'}
                    </button>}
            </div>
        )
    }
}