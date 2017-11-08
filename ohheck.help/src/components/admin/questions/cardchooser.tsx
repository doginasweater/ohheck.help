import * as React from 'react';
import { connect } from 'react-redux';
import { Question, Group, Subunit, Answer } from 'types/admin';
import { Icon } from 'components/common';
import { IReduxProps, IAdminStore, ISurveyMgmt } from 'types/redux';
import { newSetCardFilter, newCardsFetch, newSelectCard, newUnselectCard } from 'actions/surveymgmt';
import { ChooserList } from './chooserlist';
import { Card, Idol } from 'types/commontypes';

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
    }

    choose = (id: number, dir: string) => {
        const { dispatch } = this.props;

        if (dir === 'left') {
            dispatch(newSelectCard(id, this.props.index));
        } else if (dir === 'right') {
            dispatch(newUnselectCard(id, this.props.index));
        }
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
        dispatch(newCardsFetch(Number(event.currentTarget.value), name));
    }

    renderOptions = (items: (Group | Subunit | Idol)[]): JSX.Element[] =>
        items.map((item, index) => <option value={item.id} key={index}>{item.name}</option>);

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
        const { dispatch } = this.props;

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
        const { groupslight, subunitslight, idolslight } = this.props.admin;

        return (
            <fieldset>
                <legend>Cards</legend>

                <div className="pure-u-1">
                    Please choose a set of cards to add to the list of choices
                </div>

                <div className="pure-u-1-3">
                    <label htmlFor="group">Group</label>
                    <select name="group" className="pure-u-20-24" value={this.myVal('group')} onChange={this.handleSelect}>
                        <option value="">Choose One...</option>
                        {this.renderOptions(groupslight)}
                    </select>
                </div>

                <div className="pure-u-1-3">
                    <label htmlFor="subunit">Subunit</label>
                    <select name="subunit" className="pure-u-20-24" value={this.myVal('subunit')} onChange={this.handleSelect}>
                        <option value="">Choose One...</option>
                        {this.renderOptions(subunitslight)}
                    </select>
                </div>

                <div className="pure-u-1-3">
                    <label htmlFor="idol">Idol</label>
                    <select name="idol" className="pure-u-20-24" value={this.myVal('idol')} onChange={this.handleSelect}>
                        <option value="">Choose One...</option>
                        {this.renderOptions(idolslight)}
                    </select>
                </div>

                <div className="pure-u-1">
                    <div className="pure-u-1-2">
                        Possible cards for {this.props.mgmt.cardfiltertype}: {this.filterVal()}

                        <ChooserList dir="left" items={this.props.mgmt.cards} choose={this.choose} />
                    </div>
                    <div className="pure-u-1-2">
                        Selected

                        <ChooserList dir="right" items={this.props.mgmt.selectedcards} choose={this.choose} />
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