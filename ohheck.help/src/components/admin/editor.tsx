import * as React from 'react';
import Icon from '../icon';

let ReactMarkdown: any = require('react-markdown');

export default class Editor extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            edit: true
        }
    }

    resize = event => {
        event.target.style.height = 'auto';
        event.target.style.height = `${event.target.scrollHeight}px`;
    }

    display = () => {
        if (this.state.edit) {
            return <textarea
                name={this.props.name}
                value={this.props.value}
                onChange={this.props.handleChange}
                onKeyDown={this.resize}
                className="pure-u-1"
                style={{ 'height': 'auto' }} />
        } else {
            return <div>
                <b>Preview</b>
                <ReactMarkdown source={this.props.value} escapeHtml={true} />
            </div>;
        }
    }

    setEdit = event => {
        event.preventDefault();

        this.setState({
            edit: true
        });
    }

    setPreview = event => {
        event.preventDefault();

        this.setState({
            edit: false
        });
    }

    render() {
        return (
            <div>
                This box allows <a href="http://commonmark.org/help/">markdown</a>.
                <div className="pure-u-1" style={{ 'minHeight': '5em' }}>
                    {this.display()}
                </div>
                <button className="pure-button button-primary"
                    onClick={this.setEdit}
                    onSubmit={event => event.preventDefault()}> 
                    <Icon icon="edit" /> Edit
                </button>
                <button className="pure-button button-primary"
                    onClick={this.setPreview}
                    onSubmit={event => event.preventDefault()}>
                    <Icon icon="remove_red_eye" /> Preview
                </button>
            </div>
        );
    }
}
