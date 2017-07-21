import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IAdminStore, IReduxProps } from 'types/redux';
import { Notification } from 'types/admin';
import { Idol } from 'types/commontypes';
import { idolFetch, setNotification } from 'actions/admin';

interface SingleIdolProps {
    admin: IAdminStore
}

@connect(state => ({ admin: state.admin }))
export default class SingleIdol extends React.Component<SingleIdolProps & IReduxProps, any> {
    constructor(props) {
        super(props);

        this.state = {
            idol: null
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const { dispatch } = this.props;

        if (!id) {
            dispatch(setNotification(Notification.error('No id given. Cannot download idol.', 'singleidol', 'singleidol')));

            return;
        }


        if (!this.props.admin.fullidols) {
            dispatch(idolFetch(Number(id)));

            return;
        }

        const idol = this.props.admin.fullidols.find(item => item.id === id);

        if (!idol) {
            dispatch(idolFetch(Number(id)));
        }
    }

    render() {
        if (this.props.admin.idolloading || !this.props.admin.fullidols) {
            return (
                <div className="pure-u-1">
                    <h3>Loading...</h3>
                </div>
            );
        }

        const idol = this.props.admin.fullidols.find(item => item.id === Number(this.props.match.params.id));

        if (!idol) {
            return (
                <div className="pure-u-1">
                    <h3>Idol not found!</h3>
                </div>
            );
        }

        return (
            <div className="pure-u-1 slide-in">
                <h3>{idol.name}</h3>
                <table className="pure-table pure-table-horizontal full-width">
                    <tbody>
                        <tr>
                            <td><b>Group</b></td>
                            <td>{idol.group ? idol.group.name : "None"}</td>
                        </tr>
                        <tr>
                            <td><b>Subunit</b></td>
                            <td>{idol.subunit ? idol.subunit.name : "None"}</td>
                        </tr>
                        <tr>
                            <td><b>Last import</b></td>
                            <td>{idol.modified}</td>
                        </tr>
                        <tr>
                            <td><b>Cards</b></td>
                            <td>
                                {idol.cards && idol.cards.map((item, index) =>
                                    <div className="pure-u-1-4" key={index}>
                                        <a href={`/dashboard/cards/${item.id}`} target="_blank">
                                            {item.isidol ? "Idlz:" : "Unidlz:"} {item.gameid}
                                        </a>
                                    </div>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
