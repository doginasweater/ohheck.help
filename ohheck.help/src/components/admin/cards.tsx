import * as React from 'react';
import { Question } from '../../types/admin';
import { Card } from '../../types';

export default class Cards extends React.Component<Question, any> {
    constructor(props) {
        super(props);
    }

    renderCardList = () => this.props.answers[0].cards.map(
        (item: Card, index: number) =>
            <div className="pure-u-1-24" key={index}>
                <a href={item.imageurl} target="_blank">{item.gameid}</a>
            </div>
    );


    render() {
        return (
            <div className="pure-u-1">
                <h4>Card choices</h4>
                {this.renderCardList()}
            </div>
        );
    }
}
