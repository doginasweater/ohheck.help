import * as React from 'react';
import { Question } from 'types/admin';
import { Icon } from 'components/common';

interface CardChooserProps {
    question: Question;
    save: (question: Question, index: number) => void;
    index: number;
}

export default class CardChooser extends React.Component<CardChooserProps, any> {
    constructor(props) {
        super(props);
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
                    <select name="group" className="pure-u-20-24">
                        <option value="">Choose One...</option>
                    </select>
                </div>

                <div className="pure-u-1-4">
                    <label htmlFor="subunit">Subunit</label>
                    <select name="subunit" className="pure-u-20-24">
                        <option value="">Choose One...</option>
                    </select>
                </div>

                <div className="pure-u-1-4">
                    <label htmlFor="idol">Idol</label>
                    <select name="idol" className="pure-u-20-24">
                        <option value="">Choose One...</option>
                    </select>
                </div>

                <div className="pure-u-1-4">
                    <label htmlFor="tag">Tag</label>
                    <select name="tag" className="pure-u-20-24">
                        <option value="">Choose One...</option>
                        <option value="">Favourites</option>
                    </select>
                </div>

                <div className="pure-u-1">
                    <div className="pure-u-1-2">
                        Possible cards for <b>Tag</b>: <b>Favourites</b>

                        <div className="card-chooser">
                            <div className="card-chooser-item">
                                <div className="pure-u-3-4">
                                    <b>Select all from this list</b>
                                </div>
                                <div className="pure-u-1-4" style={{ textAlign: 'right' }}>
                                    <a href="#">
                                        <Icon icon="chevron_right" />
                                    </a>
                                </div>
                            </div>
                            <div className="card-chooser-item">
                                <div className="pure-u-3-4">
                                    <div className="pure-u-1-2">
                                        Ruby
                                    </div>
                                    <div className="pure-u-1-2">
                                        <a href="#">idlz: 1234</a>
                                    </div>
                                </div>
                                <div className="pure-u-1-4" style={{ textAlign: 'right' }}>
                                    <a href="#">
                                        <Icon icon="chevron_right" />
                                    </a>
                                </div>
                            </div>
                            <div className="card-chooser-item">
                                <div className="pure-u-3-4">
                                    <div className="pure-u-1-2">
                                        Ruby
                                    </div>
                                    <div className="pure-u-1-2">
                                        <a href="#">idlz: 1234</a>
                                    </div>
                                </div>
                                <div className="pure-u-1-4" style={{ textAlign: 'right' }}>
                                    <a href="#">
                                        <Icon icon="chevron_right" />
                                    </a>
                                </div>
                            </div>
                            <div className="card-chooser-item">
                                <div className="pure-u-3-4">
                                    <div className="pure-u-1-2">
                                        Ruby
                                    </div>
                                    <div className="pure-u-1-2">
                                        <a href="#">idlz: 1234</a>
                                    </div>
                                </div>
                                <div className="pure-u-1-4" style={{ textAlign: 'right' }}>
                                    <a href="#">
                                        <Icon icon="chevron_right" />
                                    </a>
                                </div>
                            </div>
                            <div className="card-chooser-item">
                                <div className="pure-u-3-4">
                                    <div className="pure-u-1-2">
                                        Ruby
                                    </div>
                                    <div className="pure-u-1-2">
                                        <a href="#">idlz: 1234</a>
                                    </div>
                                </div>
                                <div className="pure-u-1-4" style={{ textAlign: 'right' }}>
                                    <a href="#">
                                        <Icon icon="chevron_right" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pure-u-1-2">
                        Selected

                        <div className="card-chooser">
                            <div className="card-chooser-item">
                                <div className="pure-u-1-4">
                                    <a href="#">
                                        <Icon icon="chevron_left" />
                                    </a>
                                </div>
                                <div className="pure-u-3-4">
                                    <b>Remove all from this list</b>
                                </div>
                            </div>
                            <div className="card-chooser-item">
                                <div className="pure-u-1-4">
                                    <a href="#">
                                        <Icon icon="chevron_left" />
                                    </a>
                                </div>
                                <div className="pure-u-3-4">
                                    <div className="pure-u-1-2">
                                        Ruby
                                    </div>
                                    <div className="pure-u-1-2">
                                        <a href="#">idlz: 1234</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </fieldset>
        );
    }
}
