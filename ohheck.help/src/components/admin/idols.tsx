import { idolsFetch } from 'actions/admin';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Group, Subunit } from 'types/admin';
import { Idol } from 'types/commontypes';

class Idols extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    public componentDidMount() {
        const { dispatch } = this.props;

        if (!this.props.admin.idols) {
            dispatch(idolsFetch());
        }
    }

    public renderIdols = idols => idols.map((item: Idol, index: number) =>
        <div key={index} className="pure-u-1-3 some-space">
            <div className="idol-box">
                <Link to={{
                    pathname: `/dashboard/idols/${item.id}`,
                    state: item
                }}>
                    <b>Name</b>: {item.name}<br />
                    <b>Group</b>: {item.group ? item.group.name : 'None'}<br />
                    <b>Subunit</b>: {item.subunit ? item.subunit.name : 'None'}<br />
                    <b>Number of cards</b>: {item.cards ? item.cards.length : 0}<br />
                </Link>
            </div>
        </div>
    )

    public render() {
        if (this.props.admin.idolsloading) {
            return (
                <div>
                    <h3>Idols</h3>
                    Loading...
                </div>
            );
        }

        return (
            <div className="pure-u-1 slide-in">
                <h3>Idols</h3>
                Total number of idols: {this.props.admin.idols.length}
                <hr />
                {this.renderIdols(this.props.admin.idols)}
            </div>
        );
    }
}

export default connect((state: any) => ({ admin: state.admin }))(Idols);
