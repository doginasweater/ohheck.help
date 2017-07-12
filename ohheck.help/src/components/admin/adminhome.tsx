import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { Survey } from 'types/admin';
import { Icon } from 'components/common';
import { surveysFetch } from 'actions/admin';

@connect(state => ({ admin: state.admin }))
export default class AdminHome extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const { dispatch } = this.props;

        if (!this.props.admin.surveys) {
            dispatch(surveysFetch());
        }
    }

    renderBody = () => {
        if (this.props.admin.surveys) {
            return this.props.admin.surveys.map((item: Survey, index: number) =>
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.title}</td>
                    <td>{item.active ? <Icon icon="check" /> : <Icon icon="highlight_off" />}</td>
                    <td>{item.slug}</td>
                    <td>
                        <Link to={`/dashboard/responses/${item.id}`}>
                            Responses
                        </Link> |&nbsp;
                        <Link to={`/dashboard/bycard/${item.id}`}>
                            Responses By Card
                        </Link>
                    </td>
                    <td>
                        <Link to={`/dashboard/survey/${item.id}`}>
                            View Survey
                        </Link>
                    </td>
                </tr>
            );
        } else {
            return (
                <tr>
                    <td>Loading...</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            );
        }
    }

    render() {
        return (
            <div className="slide-in">
                <h3>Home</h3>
                <div>
                    <h4>Surveys</h4>
                    <table className="pure-table pure-table-striped pure-table-horizontal">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Title</th>
                                <th>Active</th>
                                <th>Slug</th>
                                <th>Responses</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderBody()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}