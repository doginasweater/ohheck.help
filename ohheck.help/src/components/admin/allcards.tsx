import { cardsFetch } from 'actions/admin';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card } from 'types/commontypes';
import { IAdminStore, IReduxProps } from 'types/redux';

interface IAllCardsProps {
    admin: IAdminStore;
}

class AllCards extends React.Component<IAllCardsProps & IReduxProps, any> {
    constructor(props) {
        super(props);
    }

    public componentDidMount() {
        const { skip, take } = this.props.match.params;

        this.handleUrl(skip, take);
    }

    public shouldComponentUpdate(nextProps: IAllCardsProps & IReduxProps): boolean {
        const { skip, take } = this.props.match.params;
        const nextSkip = nextProps.match.params.skip;
        const nextTake = nextProps.match.params.take;

        if ((skip !== nextSkip || take !== nextTake) && !nextProps.admin.cardsloading) {
            this.handleUrl(nextSkip, nextTake);

            return true;
        } else if (nextProps.admin.cardsloading || !nextProps.admin.cardsloading) {
            return true;
        } else {
            return false;
        }
    }

    public handleUrl = (skip: number, take: number) => {
        const { dispatch } = this.props;

        dispatch(cardsFetch(skip, take));
    }

    public renderCards = (cards: Card[]): JSX.Element[] => cards.map(
        (item: Card, index: number) =>
            <div className="pure-u-1-4" key={index}>
                <Link to={`/dashboard/cards/${item.id}`}>
                    <img src={item.imageurl} className="card" />
                </Link>
            </div>
    )

    public renderPagination = (): JSX.Element[] => {
        const { skip, take } = this.props.admin;

        const prevSkip = Number(skip) - Number(take);
        const nextSkip = Number(skip) + Number(take);

        const prev =
            <div className="pure-u-1-2" key={0}>
                <Link to={`/dashboard/cards/${prevSkip}/${take}`}>&lt; Previous {take}</Link>
            </div>;

        const next =
            <div className="pure-u-1-2" style={{ textAlign: 'right' }} key={1}>
                <Link to={`/dashboard/cards/${nextSkip}/${take}`}>Next {take} &gt;</Link>
            </div>;

        const pagination: JSX.Element[] = [];

        if (prevSkip > 0) {
            pagination.push(prev);
        } else {
            pagination.push(<div className="pure-u-1-2" key={2} />);
        }

        pagination.push(next);

        return pagination;
    }

    public render() {
        if (this.props.admin.cardsloading) {
            return (
                <div className="pure-u-1">
                    <h3>All the cards</h3>
                    Loading...
                </div>
            );
        }

        const { skip, take } = this.props.admin;

        return (
            <div className="pure-u-1 slide-in">
                <h3>All the cards</h3>
                <div className="pure-u-1">
                    {this.renderPagination()}
                </div>
                <div className="pure-u-1" style={{ margin: '2em 0 2em 0' }}>
                    {this.props.admin.cards && this.renderCards(this.props.admin.cards)}
                </div>
                <div className="pure-u-1">
                    {this.renderPagination()}
                </div>
            </div>
        );
    }
}

export default connect((state: any) => ({ admin: state.admin }))(AllCards);
