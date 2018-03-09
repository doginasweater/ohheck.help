import { groupsFetch } from 'actions/admin';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Group, Subunit } from 'types/admin';
import { Idol } from 'types/commontypes';

class Groups extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    public componentDidMount() {
        const { dispatch } = this.props;

        if (!this.props.admin.groups) {
            dispatch(groupsFetch());
        }
    }

    public renderGroup = list =>
        list.map((item, index) => (
            <div key={index}>
                <Link to={{ pathname: `/dashboard/subunits/${item.id}`, state: item }}>
                    {item.name || 'None'}
                </Link>
            </div>
        ))

    public renderList = groups =>
        groups &&
        groups.map((item: Group, index: number) => (
            <tr key={index}>
                <td>{item.name || 'None'}</td>
                <td>{this.renderGroup(item.subunits)}</td>
                <td>
                    {this.renderGroup(item.idols)}
                </td>
            </tr>
        ))

    public render() {
        if (this.props.admin.groupsloading) {
            return (
                <div className="pure-u-1">
                    <h3>Groups</h3>
                    Loading...
                </div>
            );
        }

        return (
            <div className="pure-u-1 slide-in">
                <h3>Groups</h3>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Subunits</th>
                            <th>Idols</th>
                        </tr>
                    </thead>
                    <tbody>{this.renderList(this.props.admin.groups)}</tbody>
                </table>
            </div>
        );
    }
}

export default connect((state: any) => ({ admin: state.admin }))(Groups);
