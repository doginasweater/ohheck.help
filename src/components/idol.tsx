import * as React from 'react';

export default class Idol extends React.Component<any, any> {
    constructor(props) {
        super(props);
        
        this.state = {
            clicked: false,
            imageurl: props.imageurl
        };
    }

    handleClick = () => {
        if (this.state.clicked) {
            this.setState({
                clicked: !this.state.clicked,
                imageurl: this.props.imageurl
            });
        } else {
            this.setState({
                clicked: !this.state.clicked,
                imageurl: this.props.idolized_imageurl
            });
        }
    }

    render() {
        return (
            <div className="pure-u-1 pure-u-md-1-3 pure-u-lg-1-4 some-space center">
                <img src={this.state.imageurl} style={{ width: '250px', height: '350px' }} onClick={this.handleClick} /><br />
                <p className="pure-u-1-3">
                    <b>Name</b>: oops
                </p>
                <p className="pure-u-1-3">
                    <b>Attribute</b>: {this.props.attribute}
                </p>
                <p className="pure-u-1-3">
                    <b>Rarity</b> {this.props.rarity}
                </p>
                <button className="pure-button button-primary">pick me</button>
            </div>
        )
    }
}
