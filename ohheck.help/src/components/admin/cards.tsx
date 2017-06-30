import * as React from 'react';
import { Question } from 'types/admin';
import { Card } from 'types';

export default class Cards extends React.Component<Question, any> {
    constructor(props) {
        super(props);
    }

    renderCardList = (): JSX.Element | JSX.Element[] => {
        const cards = this.props.answers[0].cards;

        if (cards) {
            return cards.map(
                (item: Card, index: number) =>
                    <div className="pure-u-1-24" key={index}>
                        <a href={item.imageurl} target="_blank">{item.gameid}</a>
                    </div>
            );
        } else {
            return <div></div>;
        }
    }


    render() {
        return (
            <div className="pure-u-1">
                <h4>Card choices</h4>
                {this.renderCardList()}
            </div>
        );
    }
}
