import * as React from 'react';
import { Link } from 'react-router-dom';

export default class SingleIdol extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            idol: null
        };
    }

    componentDidMount = () => {
        if (this.props.location.state) {
            this.setState({
                idol: this.props.location.state
            });
        }
    }

    render() {
        const { idol } = this.state;

        if (!idol) {
            return (
                <div className="pure-u-1">
                    <h3>Loading...</h3>
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
                                {idol.cards.map((item, index) =>
                                    <div className="pure-u-1-4" key={index}>
                                        <Link to={{ pathname: `/dashboard/cards/${item.id}`, state: item }}>
                                            {item.isidol ? "Idlz:" : "Unidlz:"} {item.gameid}
                                        </Link>
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
