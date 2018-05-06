import React from "react";
import { Link } from "react-router-dom";
import "./BookFetch.css";
import Truncate from 'react-truncate';
import { BrowserRouter as Router } from 'react-router-dom';

class BookFetch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			books: [],
			//bookCount: 0,
			page: 1,
			perPage: 9,
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

		//set state based on which buttons we need
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
		//dummy logging to check state of buttons
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
		fetch("http://www.bookmatch.tk:3030/book?$limit=0")
			.then(response => response.json())
			.then(parsedJSON =>
				this.setState({
					bookCount: parsedJSON.total
				})
			);
		// Fetching books and setting state to those books

		fetch(
			"http://www.bookmatch.tk:3030/book?$limit=" +
				this.state.perPage +
				"&$skip=" +
				this.state.skipBooks +
				"&$sort[id]=1"
		)
			.then(response => response.json())
			//.then(parsedJSON => console.log(parsedJSON))
			.then(parsedJSON =>
				parsedJSON.data.map(book => ({
					title: `${book.title}`,
					author: `${book.authors[0].name}`,
					summary: `${book.summary}`,
					isbn10: `${book.isbn10}`,
					cover: `${book.cover}`
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
				<div className="columns is-multiline is-centered">
					{!isLoading && books.length > 0
						? books.map(book => {
								return (
									<div
										className="column is-one-third"
										key={book.title}
									>
										<Link to={`/book/${book.isbn10}`}>
											<div className="card">
											  <div className="card-content">
											    <div className="media">
											      <div className="media-left">
											        <figure className="image">
														<img src={book.cover} alt="Placeholder" className="coverImg" />
													</figure>
											      </div>
											      <div className="media-content">
											        <p className="title is-6">{book.title}</p>
											        <p className="subtitle is-7">by {book.author}</p>
											      </div>
											    </div>
											    <div className="content has-text-justified">
											      <Truncate lines={12} ellipsis={<span>...</span>}>	  
											      	{book.summary}											      
											      </Truncate>
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
