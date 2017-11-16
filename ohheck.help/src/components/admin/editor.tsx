import { Icon, MDown } from 'components/common';
import * as React from 'react';

interface IEditorProps {
    name: string;
    value: string;
    disabled?: boolean;
    handleChange: (event: React.FormEvent<HTMLTextAreaElement>) => void;
    escapeHtml?: boolean;
}

export default class Editor extends React.Component<IEditorProps, any> {
    public editorbox: HTMLTextAreaElement | null = null;

    constructor(props) {
        super(props);

        this.state = {
            edit: true,
            escape: this.props.escapeHtml == null ? this.props.escapeHtml : true
        };
    }

    public componentDidMount() {
        if (this.props.value) {
            this.resize();
        }
    }

    public componentWillUpdate() {
        this.resize();
    }

    public componentDidUpdate() {
        this.resize();
    }

    public componentWillReceiveProps() {
        this.resize();
    }

    public resize = () => {
        if (!this.editorbox) {
            return;
        }

        this.editorbox.style.height = 'auto';
        this.editorbox.style.height = `${this.editorbox.scrollHeight + 5}px`;
    }

    public display = () => {
        if (this.state.edit) {
            return (
                <textarea
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.handleChange}
                    onKeyDown={this.resize}
                    className="pure-u-1 box"
                    disabled={this.props.disabled}
                    ref={el => this.editorbox = el}
                />
            );
        } else {
            return (
                <div className="box">
                    <b>Preview</b>
                    <MDown text={this.props.value} escapeHtml={this.props.escapeHtml} />
                </div>
            );
        }
    }

    public setEdit = event => {
        event.preventDefault();

        this.setState({
            edit: true
        });
    }

    public setPreview = event => {
        event.preventDefault();

        this.setState({
            edit: false
        });
    }

    public render() {
        return (
            <div className="editor-container">
                This box allows <a href="http://commonmark.org/help/" target="_blank">markdown</a>.
                <div className="pure-u-1 editor">
                    {this.display()}
                </div>
                <button
                    className="pure-button button-primary"
                    disabled={this.props.disabled}
                    onClick={this.setEdit}
                    onSubmit={event => event.preventDefault()}
                >
                    <Icon icon="edit" /> Edit
                </button>
                <button
                    className="pure-button button-primary"
                    disabled={this.props.disabled}
                    onClick={this.setPreview}
                    onSubmit={event => event.preventDefault()}
                >
                    <Icon icon="remove_red_eye" /> Preview
                </button>
            </div>
        );
    }
}
