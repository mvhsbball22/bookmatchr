import React from "react";

import { observer,  inject } from "mobx-react";

@inject('sessionStore', 'bookStore')
@observer class TitleView extends React.Component {
    render() {
        const {book} = this.props.bookStore;
        return(
        <div>
            {book.title}
        </div>)
    }
}

export default TitleView;