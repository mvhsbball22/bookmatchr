import React from "react";

import { observer,  inject } from "mobx-react";

import AmazonBuyButtonImg from '../assets/images/AmazonBuyButton.gif';

@inject('sessionStore', 'bookStore')
@observer class AmazonBuyButton extends React.Component {
    render() {
        const {book} = this.props.bookStore;
        return(
        <div>
            <a href={`http://www.amazon.com/dp/${book.ISBN10}/?tag=bookmatchr-20`}><img src={AmazonBuyButtonImg} alt="Buy from Amazon!" /></a>
        </div>)
    }
}

export default AmazonBuyButton;