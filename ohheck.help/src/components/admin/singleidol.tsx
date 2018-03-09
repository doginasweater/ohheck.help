import { idolFetch, setNotification } from 'actions/admin';
import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Notification } from 'types/admin';
import { Card, Idol } from 'types/commontypes';
import { IAdminStore, IReduxProps } from 'types/redux';

interface ISingleIdolProps {
    admin: IAdminStore;
}

class SingleIdol extends React.Component<ISingleIdolProps & IReduxProps, any> {
    constructor(props) {
        super(props);
    }

    public componentDidMount() {
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

    public renderCards = (cards: Card[]): JSX.Element[] =>
        cards
            .filter((c: Card) => !(c.ispromo && !c.isidol))
            .sort((a: Card, b: Card) => {
                if (a.gameid < b.gameid) {
                    return -1;
                } else if (a.gameid > b.gameid) {
                    return 1;
                }

                if (a.isidol) {
                    return 1;
                } else {
                    return -1;
                }
            }).map((item: Card, index: number) =>
                <div className="pure-u-1-4" key={index}>
                    <a href={`/dashboard/cards/${item.id}`} target="_blank">
                        {item.isidol ? 'Idlz:' : 'Unidlz:'} {item.gameid}
                    </a>
                </div>)

    public render() {
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
                            <td>{idol.group ? idol.group.name : 'None'}</td>
                        </tr>
                        <tr>
                            <td><b>Subunit</b></td>
                            <td>{idol.subunit ? idol.subunit.name : 'None'}</td>
                        </tr>
                        <tr>
                            <td><b>Last import</b></td>
                            <td>{moment(idol.modified).format('lll')}</td>
                        </tr>
                        <tr>
                            <td><b>Cards</b></td>
                            <td>
                                {idol.cards && this.renderCards(idol.cards)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect((state: any) => ({ admin: state.admin }))(SingleIdol);
