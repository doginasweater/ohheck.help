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
                how did he even do that
            </div>
        );
    }
}

if (module.hot) {
    module.hot.accept();
}

ReactDOM.render(<RealApp />, document.getElementById("react-root"));