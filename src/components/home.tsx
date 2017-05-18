import * as React from 'react';
import Survey from './survey';

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
                    have especially good or bad looks. Please *only look at the outfit and fashion*, 
                    rather than at other things like the pose, background, and facial expression.
                </p>
                <p>
                    You can choose as many as you like on this form, but try to be selective.
                </p>
                <p>
                    You can't specify whether you think the card is good or bad, and that is by 
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
                    <Survey />
                </div>
            </div>
        );
    }
}
