import * as React from 'react';
import { Link } from 'react-router-dom';
import { Idol, Subunit, Group } from '../../types/admin';
import 'whatwg-fetch';

interface IdolsState {
    idols: Idol[];
    loading: boolean;
}

export default class Idols extends React.Component<any, IdolsState> {
    constructor(props) {
        super(props);

        this.state = {
            idols: [],
            loading: true
        };
    }

    componentDidMount() {
        fetch('/admin/idols', {
            credentials: 'same-origin'
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        }).then((json: any) => {
            let data: Idol[] = json.map(item => new Idol(item));

            this.setState({
                idols: data,
                loading: false
            });
        });
    }

    renderIdols = () => this.state.idols.map((item: Idol, index: number) =>
        <div key={index} className="pure-u-1-3 some-space">
            <div className="idol-box">
                <Link to={{
                    pathname: `/dashboard/idols/${item.id}`,
                    state: item
                }}>
                    <b>Name</b>: {item.name}<br />
                    <b>Group</b>: {item.group ? item.group.name : "None"}<br />
                    <b>Subunit</b>: {item.subunit ? item.subunit.name : "None"}<br />
                    <b>Number of cards</b>: {item.cards.length}<br />
                </Link>
            </div>
        </div>
    )

    render() {
        if (this.state.loading) {
            return (
                <div>
                    <h3>Idols</h3>
                    Loading...
                </div>
            );
        }

        return (
            <div>
                <h3>Idols</h3>
                Total number of idols: {this.state.idols.length}
                <hr />
                {this.renderIdols()}
            </div>
        );
    }
}
