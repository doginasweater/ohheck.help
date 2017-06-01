import * as React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../types/card';
import 'whatwg-fetch';

interface AllCardsState {
    loading: boolean;
    cards: Card[];
    page: number;
    take: number;
}

export default class AllCards extends React.Component<any, AllCardsState> {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            cards: [],
            page: 1,
            take: 100
        };
    }

    componentDidMount() {
        this.getData(0, this.state.take);
    }

    getData = (skip, take) => {
        fetch(`/admin/cards?skip=${skip}&take=${take}`, {
            credentials: 'same-origin'
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        }).then((json: any) => {
            let data: Card[] = json.map(item => new Card(item));

            this.setState({
                cards: data,
                loading: false
            });
        });
    }

    renderCards = () => this.state.cards.map(
        (item: Card, index: number) =>
            <div className="pure-u-1-4" key={index}>
                <img src={item.imageurl} style={{ width: '250px', height: '350px' }} />
            </div>
    )

    render() {
        if (this.state.loading) {
            return (
                <div className="pure-u-1">
                    <h3>All the cards</h3>
                    Loading...
                </div>
            );
        }

        return (
            <div className="pure-u-1">
                <h3>All the cards</h3>
                {/*<div className="pure-u-3-4" />
                <div className="pure-u-1-4 some-space">
                    <label>Filter</label><br />
                    <input type="text" className="pure-u-1" />
                </div>*/}
                {this.renderCards()}
            </div>
        );
    }
}
