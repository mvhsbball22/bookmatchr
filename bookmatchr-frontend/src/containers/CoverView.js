import React from "react";

import { observer,  inject } from "mobx-react";

@inject('sessionStore', 'bookStore')
@observer class CoverView extends React.Component {
    render() {
        const {book} = this.props.bookStore;
        return(
        <div>
            <img src={book.cover} alt="Book Cover" className="max195" />
        </div>)
    }
}

export default CoverView;