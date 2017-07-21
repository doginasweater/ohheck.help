import * as React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'components/common';
import { Link } from 'react-router-dom';
import { Card, ModelBase } from 'types/commontypes';

interface ChooserListProps {
    items: any[];
    choose: (id: number, dir: string) => void;
    dir: 'left' | 'right';
}

export class ChooserList extends React.Component<ChooserListProps, any> {
    constructor(props) {
        super(props);
    }

    renderItems = (): JSX.Element[] => this.props.items.map((item: Card, index) =>
        <ChooserListItem
            id={item.id}
            name={item.idol ? item.idol.name : item.gameid.toString()}
            link={`/dashboard/cards/${item.id}`}
            linktext={`${item.isidol ? 'idlz:' : 'unidlz'} ${item.gameid.toString()}`}
            dir={this.props.dir}
            choose={this.choose}
            key={index} />
    );

    choose = (id: number): void => {
        this.props.choose(id, this.props.dir);
    }

    chooseAll = (id: number): void => {
        this.props.items.map(item => this.choose(item.id));
    }

    render() {
        return (
            <div>
                <b>Total Cards</b>: {this.props.items.length}
                <div className="card-chooser">
                    <ChooserListItem name="Select all from this list" bold={true} dir={this.props.dir} choose={this.chooseAll} id={0} />
                    {this.renderItems()}
                </div>
            </div>
        );
    }
}

interface ChooserListItemProps {
    id: number;
    name: string;
    link?: string;
    linktext?: string;
    dir: string;
    bold?: boolean;
    choose: (id: number) => void;
}

export class ChooserListItem extends React.Component<ChooserListItemProps, any> {
    constructor(props) {
        super(props);
    }

    leftOrRight = () =>
        <Icon icon={`chevron_${this.props.dir === 'left' ? 'right' : 'left'}`} />;

    render() {
        return (
            <div className="card-chooser-item" onClick={() => this.props.choose(this.props.id)}>
                <div className={`name-block ${this.props.dir === 'left' ? 'one' : 'two'}`}>
                    <div className={`name ${this.props.bold ? 'bold' : ''}`}>
                        {this.props.name}
                    </div>
                    <div className="link">
                        <a href={this.props.link || '#'} target="_blank" onClick={event => event.stopPropagation()}>
                            {this.props.linktext}
                        </a>
                    </div>
                </div>
                <div className={`chevron ${this.props.dir === 'left' ? 'two' : 'one'}`}>
                    {this.leftOrRight()}
                </div>
            </div>
        );
    }
}