import React from "react";

import { observer,  inject } from "mobx-react";

@inject('sessionStore', 'bookStore')
@observer class SummaryView extends React.Component {
    render() {
        const {book} = this.props.bookStore;
        return(
        <div>
            {book.summary}
        </div>)
    }
}

export default SummaryView;