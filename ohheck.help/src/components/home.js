import * as React from 'react';
import Survey from './survey';
export default class Home extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (React.createElement("div", { className: "pure-u-1" },
            React.createElement("h1", null, "Oh Heck, The Best and Worst Dressed of LL!SIF"),
            React.createElement("p", null, "Hello! We're Aki and Chrissu of Oh Heck on YouTube. Thanks for helping us out!"),
            React.createElement("p", null,
                "We're collecting votes on the best and worst outfits of Love Live! School Idol Festival. Please choose cards that, in your opinion, have especially good or bad looks. Please ",
                React.createElement("b", null, "only look at the outfit and fashion"),
                ", rather than at other things like the pose, background, and facial expression."),
            React.createElement("p", null,
                "You can ",
                React.createElement("b", null, "choose as many as you like"),
                " on this form, but try to be selective."),
            React.createElement("p", null,
                React.createElement("b", null, "You can't specify whether you think the card is good or bad"),
                ", and that is by design. Just choose ones you'd like us to discuss c:"),
            React.createElement("p", null, "Right now, we're focusing on CYaRon! members. Other subunits will be featured in the future! You can vote on which one will be next at the end of this survey."),
            React.createElement("p", null, "This will help us out a ton in an upcoming video series we're putting together. Please look forward to it c;"),
            React.createElement("div", null,
                React.createElement(Survey, null))));
    }
}
//# sourceMappingURL=home.js.map