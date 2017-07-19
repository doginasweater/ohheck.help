import * as React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'components/common';
import { Link } from 'react-router-dom';

export class ChooserList extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    renderItems = (): JSX.Element[] => this.props.items.map((item, index) =>
        <ChooserListItem
            name={item.name}
            link={item.link}
            linktext={item.name}
            dir={this.props.dir}
            key={index} />
    );

    render() {
        return (
            <div className="card-chooser">
                <ChooserListItem name="Select all from this list" bold={true} dir={this.props.dir} />
                <ChooserListItem name="Ruby" link="/dashboard/idols/1234" dir={this.props.dir} linktext="ruby" />
                <ChooserListItem name="Ruby" link="/dashboard/idols/1234" dir={this.props.dir} linktext="ruby" />
                <ChooserListItem name="Ruby" link="/dashboard/idols/1234" dir={this.props.dir} linktext="ruby" />
                <ChooserListItem name="Ruby" link="/dashboard/idols/1234" dir={this.props.dir} linktext="ruby" />
                <ChooserListItem name="Ruby" link="/dashboard/idols/1234" dir={this.props.dir} linktext="ruby" />
            </div>
        );
    }
}

interface ChooserListItemProps {
    name: string;
    link?: string;
    linktext?: string;
    dir: string;
    bold?: boolean;
}

export class ChooserListItem extends React.Component<ChooserListItemProps, any> {
    constructor(props) {
        super(props);
    }

    leftOrRight = () => {
        if (this.props.dir === 'left') {
            return (
                <Icon icon="chevron_right" />
            );
        } else {
            return (
                <Icon icon="chevron_left" />
            );
        }
    }

    render() {
        return (
            <div className="card-chooser-item">
                <div className={`name-block ${this.props.dir === 'left' ? 'one' : 'two'}`}>
                    <div className={`name ${this.props.bold ? 'bold' : ''}`}>
                        {this.props.name}
                    </div>
                    <div className="link">
                        <Link to={this.props.link || '#'}>{this.props.linktext}</Link>
                    </div>
                </div>
                <div className={`chevron ${this.props.dir === 'left' ? 'two' : 'one'}`}>
                    {this.leftOrRight()}
                </div>
            </div>
        );
    }
}