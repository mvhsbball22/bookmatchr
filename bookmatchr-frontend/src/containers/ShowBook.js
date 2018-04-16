import React from "react";
import { Route } from "react-router-dom";
import "./ShowBook.css";
import FakeRatings from "./FakeRatings.js";

class ShowBook extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			book: []
		};
	}

	fetchBook() {
		console.log(
			"Going to fetch a book by its id: " + this.props.match.params.id
		);

		// Getting the number of books and setting state to reflect that number
		fetch(`http://127.0.0.1:3002/api/Books/${this.props.match.params.id}`)
			.then(response => response.json())
			.then(parsedJSON =>
				this.setState({
					title: parsedJSON.title,
					author: parsedJSON.author,
					ISBN10: parsedJSON.ISBN10,
					ISBN13: parsedJSON.ISBN13,
					summary: parsedJSON.summary
				})
			)
			.then(console.log(this.state.title));
	}

	componentDidMount(props) {
		console.log("we mounted");
		console.log(this.props.match.params.id);
		this.fetchBook();
	}

	render() {
		return (
			<div>
				<p>{this.state.title}</p>
				<p>by {this.state.author}</p>
				<p>ISBN10: {this.state.ISBN10}</p>
				<p>ISBN13: {this.state.ISBN13}</p>
				<p>Summary: {this.state.summary}</p>
				<Route path="/book/:id/fakeratings" component={FakeRatings} />
			</div>
		);
	}
}

export default ShowBook;
