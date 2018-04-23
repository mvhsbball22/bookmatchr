import React from "react";
import { Link } from "react-router-dom";
import "./BookFetch.css";

class BookFetch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			books: [],
			//bookCount: 0,
			page: 1,
			perPage: 12,
			skipBooks: 0,
			needNextPageButton: false,
			needPrevPageButton: false
		};
	}

	componentDidMount() {
		this.fetchData();
	}

	componentDidUpdate() {
		this.buttonCalc();
	}

	buttonCalc() {
		//determine whether we need a next page button
		let needNextCalc = this.state.page * this.state.perPage;
		let doesNeedNext = needNextCalc <= this.state.bookCount;
		//determine whether we need a previous page button
		let doesNeedPrev = this.state.skipBooks > 0;

		if (doesNeedNext !== this.state.needNextPageButton) {
			this.setState({
				needNextPageButton: doesNeedNext
			});
		}
		if (doesNeedPrev !== this.state.needPrevPageButton) {
			this.setState({
				needPrevPageButton: doesNeedPrev
			});
		}
		console.log(
			this.state.needPrevPageButton,
			this.state.needNextPageButton
		);
	}

	nextPage() {
		let newPage = this.state.page + 1;
		let newSkip = this.state.page * this.state.perPage;
		console.log("newSkip is at " + newSkip);
		this.setState(
			{
				page: newPage,
				books: [],
				skipBooks: newSkip
			},
			() => this.fetchData()
		);
	}

	prevPage() {
		let newPage = this.state.page - 1;
		let newSkip = this.state.skipBooks - this.state.perPage;
		this.setState(
			{
				page: newPage,
				books: [],
				skipBooks: newSkip
			},
			() => this.fetchData()
		);
	}

	fetchData() {
		console.log(
			"Going to fetch some books with skipBooks at " +
				this.state.skipBooks
		);

		// Getting the number of books and setting state to reflect that number
		fetch("http://127.0.0.1:3002/api/Books/count")
			.then(response => response.json())
			.then(parsedJSON =>
				this.setState({
					bookCount: parsedJSON.count
				})
			);
		// Fetching books and setting state to those books

		fetch(
			"http://127.0.0.1:3002/api/Books?filter[limit]=" +
				this.state.perPage +
				"&filter[skip]=" +
				this.state.skipBooks
		)
			.then(response => response.json())
			.then(parsedJSON =>
				parsedJSON.map(book => ({
					title: `${book.title}`,
					author: `${book.author}`,
					summary: `${book.summary}`,
					id: `${book.id}`
				}))
			)
			.then(books =>
				this.setState({
					books,
					isLoading: false
				})
			)
			.catch(error => console.log("we failed!", error));
	}

	render() {
		const { isLoading, books, page, skipBooks } = this.state;
		console.log(
			"Currently on page: " +
				page +
				" so I will skip " +
				skipBooks +
				" books"
		);

		return (
			<div>
				<div className="columns is-multiline">
					{!isLoading && books.length > 0
						? books.map(book => {
								return (
									<div
										className="column is-one-third"
										key={book.title}
									>
										<Link to={`/book/${book.id}`}>
											<div className="card">
												<div className="card-image">
													<figure className="image is-4by3">
														<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
													</figure>
												</div>
												<div className="card-content">
													<div className="media-content">
														<p className="title is-4">
															{book.title}
														</p>
														<p className="subtitle is-6">
															by{" "}
															<b>{book.author}</b>
														</p>
													</div>
													<br />
													<div className="content">
														{book.summary}
													</div>
												</div>
											</div>
										</Link>
									</div>
								);
						  })
						: null}
				</div>
				{this.state.needPrevPageButton ? (
					<button onClick={this.prevPage.bind(this)}>
						Previous Page
					</button>
				) : (
					<div />
				)}
				{page}
				{this.state.needNextPageButton ? (
					<button onClick={this.nextPage.bind(this)}>
						Next Page
					</button>
				) : (
					<div />
				)}
			</div>
		);
	}
}

export default BookFetch;
