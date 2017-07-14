import * as React from 'react';
import { connect } from 'react-redux';
import { Question } from 'types/admin';
import { Icon } from 'components/common';
import { IReduxProps, IAdminStore, ISurveyMgmt } from 'types/redux';
import { newSetCardFilter } from 'actions/surveymgmt';
import { ChooserList } from './chooserlist';

interface CardChooserProps {
    question: Question;
    save: (question: Question, index: number) => void;
    index: number;
    admin: IAdminStore;
    mgmt: ISurveyMgmt;
}

class CardChooserInner extends React.Component<CardChooserProps & IReduxProps, any> {
    constructor(props) {
        super(props);

        console.log('props', props);
    }

    handleSelect = (event: React.FormEvent<HTMLSelectElement>): void => {
        event.preventDefault();

        const { dispatch } = this.props;

        let name: 'group' | 'subunit' | 'idol' | 'tag' | '' = '';

        switch (event.currentTarget.name) {
            case 'group':
                name = 'group';
                break;
            case 'subunit':
                name = 'subunit';
                break;
            case 'idol':
                name = 'idol';
                break;
            case 'tag':
                name = 'tag';
                break;
        }

        dispatch(newSetCardFilter(event.currentTarget.value, name));
    }

    renderGroupOptions = () => {
        const { groupslight } = this.props.admin;

        if (!groupslight) {
            return null;
        }

        return groupslight.map((item, index) => <option value={item.id} key={index}>{item.name}</option>);
    }

    renderSubunitOptions = () => {
        const { subunitslight } = this.props.admin;

        if (!subunitslight) {
            return null;
        }

        return subunitslight.map((item, index) => <option value={item.id} key={index}>{item.name}</option>);
    }

    renderIdolOptions = () => {
        const { idolslight } = this.props.admin;

        if (!idolslight) {
            return null;
        }

        return idolslight.map((item, index) => <option value={item.id} key={index}>{item.name}</option>);
    }

    myVal = (type: string): string => {
        const { cardfilter, cardfiltertype } = this.props.mgmt;

        if (type === cardfiltertype) {
            return cardfilter;
        } else {
            return '';
        }
    }

    filterVal = (): string => {
        const { groupslight, subunitslight, idolslight } = this.props.admin;
        const { cardfilter, cardfiltertype } = this.props.mgmt;

        if (!groupslight || !subunitslight || !idolslight || !cardfilter || !cardfiltertype) {
            return '';
        }

        switch (this.props.mgmt.cardfiltertype) {
            case 'group':
                const group = groupslight.find(item => item.id.toString() === cardfilter);
                return group ? group.name : '';
            case 'idol':
                const idol = idolslight.find(item => item.id.toString() === cardfilter);
                return idol ? idol.name : '';
            case 'subunit':
                const subunit = subunitslight.find(item => item.id.toString() === cardfilter);
                return subunit ? subunit.name : '';
            default:
                return '';
        }
    }

    render() {
        return (
            <fieldset>
                <legend>Cards</legend>

                <div className="pure-u-1">
                    Please choose a set of cards to add to the list of choices
                </div>

                <div className="pure-u-1-4">
                    <label htmlFor="group">Group</label>
                    <select name="group" className="pure-u-20-24" value={this.myVal('group')} onChange={this.handleSelect}>
                        <option value="">Choose One...</option>
                        {this.renderGroupOptions()}
                    </select>
                </div>

                <div className="pure-u-1-4">
                    <label htmlFor="subunit">Subunit</label>
                    <select name="subunit" className="pure-u-20-24" value={this.myVal('subunit')} onChange={this.handleSelect}>
                        <option value="">Choose One...</option>
                        {this.renderSubunitOptions()}
                    </select>
                </div>

                <div className="pure-u-1-4">
                    <label htmlFor="idol">Idol</label>
                    <select name="idol" className="pure-u-20-24" value={this.myVal('idol')} onChange={this.handleSelect}>
                        <option value="">Choose One...</option>
                        {this.renderIdolOptions()}
                    </select>
                </div>

                {/*<div className="pure-u-1-4">
                    <label htmlFor="tag">Tag</label>
                    <select name="tag" className="pure-u-20-24">
                        <option value="">Choose One...</option>
                        <option value="">Favourites</option>
                    </select>
                </div>*/}

                <div className="pure-u-1">
                    <div className="pure-u-1-2">
                        Possible cards for <b>{this.props.mgmt.cardfiltertype}</b>: <b>{this.filterVal()}</b>

                        <ChooserList dir="left" />
                    </div>
                    <div className="pure-u-1-2">
                        Selected

                        <ChooserList dir="right" />
                    </div>
                </div>
            </fieldset>
        );
    }
}

type OwnProps = Pick<CardChooserProps, 'question' | 'save' | 'index'>;

const CardChooser = connect(
    (state, ownProps: OwnProps) => ({ admin: state.admin, mgmt: state.surveymgmt })
)(CardChooserInner);

export default CardChooser;