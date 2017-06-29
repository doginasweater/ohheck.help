import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { Idol } from '../survey';
import { responsesByCardFetch } from '../../actions/admin';

@connect(state => ({admin: state.admin}))
export default class SurveysByCard extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(responsesByCardFetch(this.props.match.params.id));
    }

    renderList = list => list.map((item, index) =>
        <Idol
            imageurl={item.imageurl}
            rarity={item.rarity}
            attribute={item.attribute}
            name={item.id}
            count={item.count}
            key={item.id} />
    );

    render() {
        const body = !this.props.admin.responsesbycardloading ? this.renderList(this.props.admin.responsesbycard) : <div>Loading...</div>

        return (
            <div className="pure-u-1 slide-in">
                <h3>Survey By Card</h3>
                <div className="pure-u-1">
                    {body}
                </div>
            </div>
        );
    }
}
