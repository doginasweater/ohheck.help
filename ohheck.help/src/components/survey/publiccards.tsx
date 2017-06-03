import * as React from 'react';
import { Card } from '../../types/card';
import { Idol } from '.';
import * as Rx from 'rxjs';

interface CardsState {
    cards: JSX.Element[];
    source$: Rx.Observable<any>;
}

export default class PublicCards extends React.Component<any, CardsState> {
    constructor(props) {
        super(props);

        this.state = {
            cards: [] as JSX.Element[],
            source$: Rx.Observable.interval(100).take(props.cards.length)
        }
    }

    renderCards = () => this.state.source$
        .subscribe(val => {
            const { cards } = this.props;
            const item: Card = cards[val];

            this.setState({
                cards: [
                    ...this.state.cards,
                    <Idol
                        imageurl={item.imageurl}
                        rarity={item.rarity}
                        attribute={item.attribute}
                        selected={this.props.choices[item.id]}
                        handleClick={() => this.props.handleClick(item.id)}
                        name={item.id}
                        key={item.id} />
                ]
            })
        });

    componentDidMount = () => {
        this.renderCards();
    }

    render() {
        return (
            <span>
                {this.state.cards}
            </span>
        );
    }
}
