import * as React from 'react';
import 'whatwg-fetch';
import { Subunit, Idol } from '../../types/admin';
import { Link } from 'react-router-dom';

interface SubunitState {
    loading: boolean;
    subunits: Subunit[];
}

export default class Subunits extends React.Component<any, SubunitState> {
    constructor(props) {
        super(props);

        this.state = {
            subunits: [],
            loading: true
        };
    }

    componentDidMount() {
        fetch('/admin/subunits', {
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
            let data: Subunit[] = json.map(item => new Subunit(item));

            this.setState({
                subunits: data
            });
        })
        .catch(ex => console.log(ex));
    }

    renderList = () => this.state.subunits.map(
        (item: Subunit, index: number) =>
            <tr key={index}>
                <td>
                    <Link to={`/dashboard/subunits/${item.id}`}>
                        { item.name }
                    </Link>
                </td>
                <td>
                    {item.idols.map((innerItem: Idol, innerIndex: number) =>
                        <div key={innerIndex} className="pure-u-1-3">
                            <Link to={`/dashboard/idol/${innerItem.id}`}>
                                {innerItem.name}
                            </Link>
                        </div>
                    ) || "none yet"}
                </td>
            </tr>
    );

    render() {
        if (this.state.loading) {
            return (
                <div className="pure-u-1">
                    <h3>Subunits</h3>
                    Loading...
                </div>
            );
        }

        return (
            <div className="pure-u-1">
                <h3>Subunits</h3>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Idols</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>
            </div>
        );
    }
}
