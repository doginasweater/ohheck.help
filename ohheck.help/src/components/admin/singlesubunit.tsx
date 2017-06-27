import * as React from 'react';
import { Subunit, Idol, Group } from '../../types/admin';
import { Link } from 'react-router-dom';

interface SingleSubunitState {
    subunit: Subunit;
    loading: boolean;
}

export default class SingleSubunit extends React.Component<any, SingleSubunitState> {
    constructor(props) {
        super(props);

        this.state = {
            subunit: new Subunit({}),
            loading: true
        };
    }

    componentDidMount() {
        if (!this.props.location.state) {
            this.getData(this.props.match.params.id);
        } else if (this.props.location.state.id != this.props.match.params.id) {
            this.getData(this.props.match.params.id);
        } else {
            this.setState({
                subunit: new Subunit(this.props.location.state),
                loading: false
            });
        }
    }

    getData = id => {
        fetch(`/admin/subunit/${id}`, {
            credentials: 'same-origin'
        })
            .then(response => {
                this.setState({
                    loading: false
                });

                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(response.statusText);
                }
            })
            .then((json: any) => {
                let data: Subunit = new Subunit(json);

                this.setState({
                    subunit: data
                });
            })
            .catch(ex => console.log(ex));
    }

    renderIdols = () => this.state.subunit.idols.map((item: Idol, index: number) =>
        <div className="pure-u-1-3" key={index}>
            <Link to={{
                pathname: `/dashboard/idols/${item.id}`,
                state: item
            }}>
                {item.name}
            </Link>
            <p>
                <b>Number of cards</b>: {item.cards.length}
            </p>
        </div>
    ) 

    render() {
        if (this.state.loading) {
            return (
                <div className="pure-u-1">
                    Loading...
                </div>
            );
        }

        const { subunit } = this.state;

        return (
            <div className="pure-u-1 slide-in">
                <h3>{subunit.name}</h3>
                {subunit.idols.length > 0 ? this.renderIdols() : <div>No data to display</div>}
            </div>
        );
    }
}
