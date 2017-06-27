import * as React from 'react';

export default class SingleCard extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            card: null
        };
    }

    componentDidMount = () => {
        if (this.props.location.state) {
            this.setState({
                card: this.props.location.state
            });
        }
    }

    render() {
        const { card } = this.state;

        if (!card) {
            return (
                <div className="pure-u-1">
                    <h3>Loading...</h3>
                </div>
            );
        }

        return (
            <div className="pure-u-1 slide-in">
                <div className="pure-u-1">
                    <a href="#" onClick={this.props.history.goBack}>Back</a>
                </div>
                <hr />
                <div className="pure-u-1">
                    <img src={card.imageurl} />
                </div>
                <hr />
                <div className="pure-u-1-4">
                    <b>Game ID</b>: {card.gameid}
                </div>
                <div className="pure-u-1-4">
                    <b>Idlz</b>: {card.isidol ? "Yes" : "No"}
                </div>
                <div className="pure-u-1-4">
                    <b>Promo</b>: {card.ispromo ? "Yes" : "No"}
                </div>
                <div className="pure-u-1-4">
                    <b>Last Modified</b>: {card.modified}
                </div>
                <div className="pure-u-1">
                    <b>Tags</b>: (coming soon)
                </div>
            </div>
        );
    }
}
