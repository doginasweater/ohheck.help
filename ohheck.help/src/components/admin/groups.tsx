import * as React from 'react';
import { connect } from 'react-redux';
import { Group, Subunit, Idol } from '../../types/admin';
import { Link } from 'react-router-dom';
import { groupsFetch } from '../../actions/admin';

@connect(state => ({ admin: state.admin }))
export default class Groups extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        if (!this.props.admin.groups) {
            dispatch(groupsFetch());
        }
    }

    renderList = groups => groups.map(
        (item: Group, index: number) =>
            <tr key={index}>
                <td>{item.name || "None"}</td>
                <td>
                    {item.subunits.map((innerItem: Subunit, innerIndex: number) =>
                        <div key={innerIndex}>
                            <Link to={{ pathname: `/dashboard/subunits/${innerItem.id}`, state: innerItem }}>
                                {innerItem.name || "None"}
                            </Link>
                        </div>
                    )}
                </td>
                <td>
                    {item.idols.map((innerItem: Idol, innerIndex: number) =>
                        <div key={innerIndex} className="pure-u-1-3">
                            <Link to={{ pathname: `/dashboard/idols/${innerItem.id}`, state: innerItem }}>
                                {innerItem.name}
                            </Link>
                        </div>
                    )}
                </td>
            </tr>
    );

    render() {
        if (this.props.admin.groupsloading) {
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
                        {this.renderList(this.props.admin.groups)}
                    </tbody>
                </table>
            </div>
        );
    }
}
