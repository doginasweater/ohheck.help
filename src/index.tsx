import * as React from 'react';
import * as ReactDOM from 'react-dom';

class RealApp extends React.Component<any, any> {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                whaaaaaaaaaaaaat<br />
                how did he even do that<br />
                look, bitch, this is even cooler<br />
                fuck you missed it
            </div>
        );
    }
}

if (module.hot) {
    module.hot.accept();
}

ReactDOM.render(<RealApp />, document.getElementById("react-root"));