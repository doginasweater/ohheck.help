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
            <div className="pure-u-1">
                <h3>{idol.name}</h3>
                <table className="pure-table pure-table-horizontal" style={{ 'width': '100%' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Group</td>
                            <td>{idol.group.name}</td>
                        </tr>
                        <tr>
                            <td>Subunit</td>
                            <td>{idol.subunit.name}</td>
                        </tr>
                        <tr>
                            <td>Last import</td>
                            <td>{idol.modified}</td>
                        </tr>
                        <tr>
                            <td>Cards</td>
                            <td>
                                {idol.cards.map((item, index) =>
                                    <div className="pure-u-1-4" key={index}>
                                        <Link to={{
                                            pathname: `/dashboard/cards/${item.id}`,
                                            state: item
                                        }}>
                                            {item.isidol ? "Idlz: " : "Unidlz: "}{item.gameid}
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
