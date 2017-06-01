import * as React from 'react';
import 'whatwg-fetch';
import { Group, Subunit, Idol } from '../../types/admin';
import { Link } from 'react-router-dom';

interface GroupsState {
    loading: boolean;
    groups: Group[];
}

export default class Groups extends React.Component<any, GroupsState> {
    constructor(props) {
        super(props);

        this.state = {
            groups: [],
            loading: true
        };
    }

    componentDidMount() {
        fetch('/admin/groups', {
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
            let data: Group[] = json.map(item => new Group(item));

            this.setState({
                groups: data
            });
        })
        .catch(ex => console.log(ex));
    }

    renderList = () => this.state.groups.map(
        (item: Group, index: number) =>
            <tr key={index}>
                <td>{item.name}</td>
                <td>
                    {item.subunits.map((innerItem: Subunit, innerIndex: number) =>
                        <div key={innerIndex}>
                            <Link to={{
                                pathname: `/dashboard/subunits/${innerItem.id}`,
                                state: innerItem
                            }}>
                                {innerItem.name}
                            </Link>
                        </div>
                    )}
                </td>
                <td>
                    {item.idols.map((innerItem: Idol, innerIndex: number) =>
                        <div key={innerIndex} className="pure-u-1-3">
                            <Link to={{
                                pathname: `/dashboard/idols/${innerItem.id}`,
                                state: innerItem
                            }}>
                                {innerItem.name}
                            </Link>
                        </div>
                    )}
                </td>
            </tr>
    );

    render() {
        if (this.state.loading) {
            return (
                <div className="pure-u-1">
                    <h3>Groups</h3>
                    Loading...
                </div>
            );
        }

        return (
            <div className="pure-u-1">
                <h3>Groups</h3>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Subunits</th>
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
