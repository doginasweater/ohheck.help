import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import Login from './login';
import 'whatwg-fetch';
import { Survey } from '../../types/admin';
import Icon from '../icon';

export default class AdminHome extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            surveys: [] as Survey[]
        };
    }

    componentWillMount() {
        fetch('/admin/allsurveys', {
            credentials: 'same-origin'
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then((json: any) => {
            let data: Survey[] = json.map((item, index) => new Survey(item));

            this.setState({
                surveys: data
            });
        })
        .catch(ex => {
            console.log('exception!', ex);
        });
    }

    renderBody = () => {
        if (this.state.surveys.length > 0) {
            return this.state.surveys.map((item: Survey, index: number) => 
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
            <div className="fade-in-slow">
                <h3>Home</h3>
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
        );
    }
}