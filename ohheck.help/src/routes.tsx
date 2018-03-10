import { Admin } from 'components/admin';
import { Aki, Bandori, Home, Icon } from 'components/common';
import { Form, Thanks } from 'components/survey';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link, Route } from 'react-router-dom';
import './scss/app.scss';

export const Routes = <div className="main pure-g">
    <div className="pure-u-1">
        <div className="pull-right">
            <a href="https://twitter.com/akikkyu" target="_blank">aki's twitter</a> |&nbsp;
            <a href="https://ko-fi.com/akikkyu" target="_blank">aki's ko-fi</a> | &nbsp;
            <a href="https://twitter.com/chrissuwa" target="_blank">chrissu's twitter</a> | &nbsp;
            <a href="https://ko-fi.com/chrisu" target="_blank">chrissu's ko-fi</a> | &nbsp;
            <a href="https://youtube.com/c/OhHeck" target="_blank">youtube channel!</a>
        </div>
    </div>

    <Route exact path="/" component={Home} />
    <Route path="/thanks" component={Thanks} />
    <Route path="/dashboard" component={Admin} />
    <Route path="/survey/:id" component={Form} />
    <Route path="/aki" component={Aki} />
    <Route path="/bandori" component={Bandori} />

    <footer className="pure-u-1">
        <div className="pull-right small">
            &copy; 2017 - Oh Heck Enterprises. site by <a target="_blank" href="https://github.com/doginasweater/ohheck.help">a dog in a sweater</a>.
                            idol data provided by <a href="http://schoolido.lu" target="_blank">schoolido.lu</a>
        </div>
    </footer>
</div>;
