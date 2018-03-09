import { responsesByCardFetch, surveysFetch } from 'actions/admin';
import { Idol } from 'components/common';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { IAdminStore, IReduxProps } from 'types/redux';

interface ISurveysByCardProps {
    admin: IAdminStore;
}

class SurveysByCard extends React.Component<ISurveysByCardProps & IReduxProps, any> {
    constructor(props) {
        super(props);
    }

    public componentDidMount() {
        const { dispatch } = this.props;

        if (!this.props.admin.surveys) {
            dispatch(surveysFetch());
        }

        dispatch(responsesByCardFetch(this.props.match.params.id));
    }

    public renderList = list => list.map((item, index) =>
        <Idol
            imageurl={item.imageurl}
            rarity={item.rarity}
            attribute={item.attribute}
            name={item.id}
            count={item.count}
            key={item.id} />
    )

    public render() {
        const body = !this.props.admin.responsesbycardloading ? this.renderList(this.props.admin.responsesbycard) : <div>Loading...</div>;

        if (!this.props.admin.surveys) {
            return (
                <div className="pure-u-1 slide-in">
                    <h3>Survey By Card</h3>
                    <div className="pure-u-1">
                        Unable to load data
                    </div>
                </div>
            );
        }

        const survey = this.props.admin.surveys.find(item => item.id === Number(this.props.match.params.id));

        return (
            <div className="pure-u-1 slide-in">
                <h3>Survey By Card {survey ? `for ${survey.name}` : ''}</h3>
                <div className="pure-u-1">
                    {this.props.admin.responsesbycard && this.props.admin.responsesbycard.length > 0 ? body : 'No responses...yet...'}
                </div>
            </div>
        );
    }
}

export default connect((state: any) => ({ admin: state.admin }))(SurveysByCard);
