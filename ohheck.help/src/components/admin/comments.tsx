import * as React from 'react';

export default class AdminComments extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="slide-in">
                <h3>View Comments</h3>

                <table className="pure-table pure-table-horizontal">
                    <thead>
                        <tr>
                            <td>Info</td>
                            <td>Comment</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Submitted By: anonymous<br />
                                Submitted: 11/7/2017
                                </td>
                            <td>
                                i love you guys!
                            </td>
                            <td>
                                <button className="pure-button button-primary">
                                    Answer
                                </button>
                                <button className="pure-button button-secondary">
                                    Delete
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Submitted By: anonymous<br />
                                Submitted: 11/7/2017
                            </td>
                            <td>
                                you guys are amazing and i just NEED to know how many stuffed animals you own
                            </td>
                            <td>
                                Answered by <b>chris</b> on 11/5/2017
                            </td>
                        </tr>
                        <tr>
                            <td>Answer</td>
                            <td>thanks!! i own at least 27 but i can't really speak for aki</td>
                            <td>
                                <button className="pure-button button-primary">Edit</button>
                                <button className="pure-button button-secondary">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}