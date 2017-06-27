import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { responsesFetch } from '../../actions/admin';
import { Response, ResponseAnswer } from '../../types/admin';

@connect(state => ({ admin: state.admin }))
export default class Responses extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        if (!this.props.admin.responses && (this.props.match.params.id !== this.props.admin.surveyid)) {
            const { dispatch } = this.props;

            dispatch(responsesFetch(this.props.match.params.id));
        }
    }

    renderList = list =>
        list.map((item: Response, index) =>
            <tr key={index}>
                <td>{item.submitted}</td>
                <td>{item.questions[0].cards}</td>
                <td>{item.questions[1].text}</td>
                <td>{item.questions[2].text}</td>
                <td>{item.questions[3].answer}</td>
            </tr>
        );


    render() {
        const body = !this.props.admin.responsesloading ? this.renderList(this.props.admin.responses) : <tr><td>Loading...</td></tr>

        return (
            <div className="pure-u-1">
                <h3>responses</h3>
                <table className="pure-table pure-table-striped pure-table-horizontal">
                    <thead>
                        <tr>
                            <th>Submitted</th>
                            <th>Cards</th>
                            <th>Submitter</th>
                            <th>Comments</th>
                            <th>Next Group</th>
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
