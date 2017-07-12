import * as React from 'react';
import { connect } from 'react-redux';
import { Card } from 'types/commontypes';
import { Idol } from 'components/common';
import * as Rx from 'rxjs';
import { displayCard } from 'actions/survey';

interface CardsState {
    cards: JSX.Element[];
    source$: Rx.Observable<any>;
}

@connect(state => ({ form: state.survey }))
export default class PublicCards extends React.Component<any, CardsState> {
    constructor(props) {
        super(props);

        this.state = {
            cards: [],
            source$: Rx.Observable.interval(50).take(props.cards.length)
        }
    }

    renderCards = () => this.state.source$
        .subscribe(val => {
            const { cards, dispatch } = this.props;
            const item: Card = cards[val];

            dispatch(displayCard(
                <Idol
                    imageurl={item.imageurl}
                    rarity={item.rarity}
                    attribute={item.attribute}
                    selected={this.props.form.cards[item.id] || false}
                    handleClick={() => this.props.handleClick(item.id)}
                    name={item.id}
                    key={item.id} />
            ));
        });

    componentDidMount() {
        this.renderCards();
    }

    render() {
        return (
            <span>
                {this.props.form.displayedcards}
            </span>
        );
    }
}
