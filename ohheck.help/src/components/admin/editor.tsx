import * as React from 'react';
import Icon from 'components/icon';

let ReactMarkdown: any = require('react-markdown');

export default class Editor extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            edit: true
        };
    }

    editorbox: HTMLTextAreaElement | null = null;

    componentDidMount() {
        if (this.props.value) {
            this.resize();
        }
    }

    componentDidUpdate() {
        this.resize();
    }

    resize = () => {
        if (!this.editorbox) {
            return;
        }

        this.editorbox.style.height = 'auto';
        this.editorbox.style.height = `${this.editorbox.scrollHeight + 5}px`;
    }

    display = () => {
        if (this.state.edit) {
            return (
                <textarea
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.handleChange}
                    onKeyDown={this.resize}
                    className="pure-u-1 box"
                    ref={el => this.editorbox = el} />
            );
        } else {
            return (
                <div className="box">
                    <b>Preview</b>
                    <ReactMarkdown source={this.props.value} escapeHtml={true} />
                </div>
            );
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
            <div className="editor-container">
                This box allows <a href="http://commonmark.org/help/">markdown</a>.
                <div className="pure-u-1 editor">
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
