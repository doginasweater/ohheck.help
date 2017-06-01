import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import { Idol } from '../survey';

export default class SurveysByCard extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        fetch('/admin/surveysbycard', {
            credentials: 'include'
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(data => {
            this.setState({
                responses: data
            });
        });
    }

    renderList = list => list.map((item, index) =>
        <Idol
            imageurl={item.imageurl}
            rarity={item.rarity}
            attribute={item.attribute}
            name={item.id}
            count={item.count}
            key={item.id} />
    );

    render() {
        const body = this.state.responses ? this.renderList(this.state.responses) : <div>Loading...</div>

        return (
            <div className="pure-u-1">
                <h3>surveys by card</h3>
                <div className="pure-u-1">
                    {body}
                </div>
            </div>
        );
    }
}
