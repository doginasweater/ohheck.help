import * as React from 'react';
import Form from './survey/form';

export default class Home extends React.Component<any, any> {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="pure-u-1">
                <h1>Oh Heck, The Best and Worst Dressed of LL!SIF</h1>
                <p>
                    Hello! We're Aki and Chrissu of Oh Heck on YouTube. Thanks for helping us out!
                </p>
                <p>
                    We're collecting votes on the best and worst outfits of Love Live! 
                    School Idol Festival. Please choose cards that, in your opinion, 
                    have especially good or bad looks. Please <b>only look at the outfit and fashion</b>, 
                    rather than at other things like the pose, background, and facial expression.
                </p>
                <p>
                    You can <b>choose as many as you like</b> on this form, but try to be selective.
                </p>
                <p>
                    <b>You can't specify whether you think the card is good or bad</b>, and that is by 
                    design. Just choose ones you'd like us to discuss c:
                </p>
                <p>
                    Right now, we're focusing on CYaRon! members. Other subunits will be featured 
                    in the future! You can vote on which one will be next at the end of this survey.
                </p>
                <p>
                    This will help us out a ton in an upcoming video series we're putting together. 
                    Please look forward to it c;
                </p>
                <div>
                    <Form />
                </div>
            </div>
        );
    }
}
