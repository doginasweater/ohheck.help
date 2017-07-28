import * as React from 'react';

const ReactMarkdown: any = require('react-markdown');

interface MDownProps {
    text: string;
    escapeHtml?: boolean;
}

export class MDown extends React.Component<MDownProps, any> {
    escapeHtml = true;

    constructor(props) {
        super(props);

        if (typeof props.escapeHtml != 'undefined') {
            this.escapeHtml = props.escapeHtml;
        }
    }

    render() {
        return <ReactMarkdown escapeHtml={this.escapeHtml} source={this.props.text} />;
    }
}