import * as React from 'react';
import { Survey, Question } from '../../types/admin';
import 'whatwg-fetch';
import Questions from '../questions';

interface SurveyViewState {
    survey: Survey;
    loading: boolean;
}

export default class SurveyView extends React.Component<any, SurveyViewState> {
    constructor(props) {
        super(props);

        this.state = {
            survey: new Survey({}),
            loading: true
        };
    }

    componentDidMount = () => {
        fetch(`/admin/survey/${this.props.match.params.id}`, {
            credentials: 'same-origin'
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(json => {
            let data = new Survey(json);

            this.setState({
                survey: data,
                loading: false
            });
        });
    }


    render() {
        if (this.state.loading) {
            return (
                <div>Loading...</div>
            );
        }

        const { survey } = this.state;

        return (
            <div>
                <h3>{survey.name}</h3>
                <div>
                    <form className="pure-form pure-form-stacked">
                        <div className="pure-u-1-3">
                            <b>Title</b>: {survey.title}
                        </div>
                        <div className="pure-u-1-3">
                            <b>Slug (url)</b>: {survey.slug}
                        </div>
                        <div className="pure-u-1-3">
                            <b>Currently Active</b>: {survey.active}
                        </div>
                        <div className="pure-u-1-3">
                            <b>Created</b> {survey.created} <b>by</b> {survey.createdby}
                        </div>
                        <div className="pure-u-1-3">
                            <b>Last modified</b> {survey.modified} <b>by</b> {survey.modifiedby}
                        </div>
                        <div className="pure-u-1">
                            <label htmlFor="comments"><b>Comments</b>:</label>
                            <textarea value={survey.comments} name="comments" className="pure-u-1" style={{ 'height': '300px' }} />
                        </div>
                        <div className="pure-u-1">
                            <b>Questions</b>:
                            <Questions questions={this.state.survey.questions} ispublic={false} />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
