import React from "react";

import { observer,  inject } from "mobx-react";

@inject('sessionStore', 'bookStore')
@observer class AuthorsView extends React.Component {
    render() {
        const {book} = this.props.bookStore;
        return(
        <div>
            by {book.authors.map((author, i) => <span key={i}> {author.name}  </span>)}
        </div>)
    }
}

export default AuthorsView;