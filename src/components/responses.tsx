import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import 'whatwg-fetch';

export default class Responses extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = { };
    }

    componentDidMount = () => {
        fetch('/admin/responses')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                this.setState({
                    responses: data
                });
            });
    }

    renderList = list =>
        list.map((item, index) =>
            <tr key={index}>
                <td>
                    {item.submitted}
                </td>
                <td>
                    {item.submitter}
                </td>
                <td>
                    {item.comments}
                </td>
                <td>
                    {item.cards}
                </td>
            </tr>
        );


    render() {
        const body = this.state.responses ? this.renderList(this.state.responses) : <tr><td>Loading...</td></tr>

        return (
            <div className="pure-u-1">
                <h3>responses</h3>
                <table className="pure-table pure-table-striped pure-table-horizontal">
                    <thead>
                        <tr>
                            <th>Submitted</th>
                            <th>Submitter</th>
                            <th>Comments</th>
                            <th>Cards</th>
                        </tr>
                    </thead>
                    <tbody>
                        {body}
                    </tbody>
                </table>
            </div>
        );
    }
}
