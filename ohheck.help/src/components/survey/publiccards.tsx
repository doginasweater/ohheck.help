import * as React from 'react';
import { Card } from '../../types/card';
import Idol from './idol';

export default class PublicCards extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    renderCards = () => this.props.cards.map(
        (item: Card, index: number) =>
            <Idol
                imageurl={item.imageurl}
                rarity={item.rarity}
                attribute={item.attribute}
                selected={this.props.choices[item.id]}
                handleClick={() => this.props.handleClick(item.id)}
                name={item.id}
                key={index} />
    );

    render() {
        return (
            <span>
                {this.renderCards()}
            </span>
        );
    }
}
