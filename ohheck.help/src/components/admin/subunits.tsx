import * as React from 'react';
import { connect } from 'react-redux';
import { Subunit, Idol } from '../../types/admin';
import { Link } from 'react-router-dom';
import { subunitsFetch } from '../../actions/admin';

@connect(state => ({ admin: state.admin }))
export default class Subunits extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        if (!this.props.admin.subunits) {
            dispatch(subunitsFetch());
        }
    }

    renderList = subunits => subunits.map(
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
                            <Link to={{ pathname: `/dashboard/idols/${innerItem.id}`, state: innerItem }}>
                                {innerItem.name}
                            </Link>
                        </div>
                    ) || "none yet"}
                </td>
            </tr>
    );

    render() {
        if (this.props.admin.subunitsloading) {
            return (
                <div className="pure-u-1">
                    <h3>Subunits</h3>
                    Loading...
                </div>
            );
        }

        return (
            <div className="pure-u-1 slide-in">
                <h3>Subunits</h3>
                <table className="pure-table pure-table-horizontal full-width">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Idols</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList(this.props.admin.subunits)}
                    </tbody>
                </table>
            </div>
        );
    }
}
