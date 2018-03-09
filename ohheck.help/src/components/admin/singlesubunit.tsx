import { setNotification, subunitFetch } from 'actions/admin';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Group, Notification, Subunit } from 'types/admin';
import { Idol } from 'types/commontypes';
import { IAdminStore, IReduxProps } from 'types/redux';

interface ISingleSubunitProps {
    admin: IAdminStore;
}

class SingleSubunit extends React.Component<ISingleSubunitProps & IReduxProps, any> {
    constructor(props) {
        super(props);
    }

    public componentDidMount() {
        const id = this.props.match.params.id;
        const { dispatch } = this.props;

        if (!id) {
            dispatch(setNotification(Notification.error('No id given. Cannot download subunit.', 'singlesubunit', 'singlesubunit')));

            return;
        }

        if (!this.props.admin.fullidols) {
            dispatch(subunitFetch(Number(id)));

            return;
        }

        const subunit = this.props.admin.fullsubunits.find(item => item.id === id);

        if (!subunit) {
            dispatch(subunitFetch(Number(id)));
        }
    }

    public renderIdols = (idols: Idol[]) => {
        if (!idols) {
            return [<div key={0} />];
        }

        return idols.map((item: Idol, index: number) =>
            <div className="pure-u-1-3" key={index}>
                <a href={`/dashboard/idols/${item.id}`}>
                    {item.name}
                </a>
                <p>
                    <b>Number of cards</b>: {item.cards ? item.cards.length : 0}
                </p>
            </div>
        );
    }

    public render() {
        if (this.props.admin.subunitloading || !this.props.admin.fullsubunits) {
            return (
                <div className="pure-u-1">
                    <h3>Loading...</h3>
                </div>
            );
        }

        const subunit = this.props.admin.fullsubunits.find(item => item.id === Number(this.props.match.params.id));

        if (!subunit) {
            return (
                <div className="pure-u-1">
                    <h3>Idol not found!</h3>
                </div>
            );
        }

        return (
            <div className="pure-u-1 slide-in">
                <h3>{subunit.name}</h3>
                {subunit.idols && subunit.idols.length > 0 ? this.renderIdols(subunit.idols) : <div>No data to display</div>}
            </div>
        );
    }
}

export default connect((state: any) => ({ admin: state.admin }))(SingleSubunit);
