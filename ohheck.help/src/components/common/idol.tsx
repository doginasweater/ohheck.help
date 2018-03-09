import * as React from 'react';
import { connect } from 'react-redux';

interface IIdolProps {
    name: number;
    imageurl: string;
    rarity: string;
    attribute: string;
    selected?: boolean;
    count?: number;
    handleClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

class IdolInner extends React.Component<IIdolProps, any> {
    constructor(props) {
        super(props);
    }

    public render() {
        const { selected } = this.props;

        return (
            <div className="pure-u-1 pure-u-md-1-3 pure-u-lg-1-4 some-space center fade-in" onClick={this.props.handleClick}>
                <img src={this.props.imageurl} className="card" />
                <br />
                {this.props.count ? <span><b>Count</b>: {this.props.count}</span> :
                    <button
                        className={`pure-button ${selected ? 'button-primary' : 'button-secondary'}`}
                        name={this.props.name.toString()}
                        onClick={event => event.preventDefault()}>
                        {selected ? 'selected' : 'pick me'}
                    </button>}
            </div>
        );
    }
}

export const Idol = connect((state: any, ownProps: any) => ({ selected: state.survey.cards[ownProps.name] }))(IdolInner);
