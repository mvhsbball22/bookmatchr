import React from 'react';
import { Link } from 'react-router-dom';
import "./AmazonBookSearch.css";
import Truncate from 'react-truncate';

class AmazonBookSearch extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			books: [],
		};
	}	

	componentDidMount() {
		this.getBooks();
	}

	componentDidUpdate(nextProps) {
		if (nextProps.match.params.query !== this.props.match.params.query || nextProps.match.params.page !== this.props.match.params.page){
			this.getBooks();
		}
	}

	getBooks(){		
		
		let dummyBooks = []

		fetch("http://www.bookmatch.tk:3030/amazon-book-search?search=" + this.props.match.params.query + "&page=" + this.props.match.params.page)
		.then((amazonResponse) => amazonResponse.json())
		.then(function(parsedAmazon) {
			parsedAmazon.result.ItemSearchResponse.Items.Item.forEach(function(book) {
				let tempBook = [];

				// add the elements that should always be there (might have to break these out if there's a failure case)
				tempBook = {
					ASIN: book.ASIN,
					author: book.ItemAttributes.Author,
					title: book.ItemAttributes.Title
				}

				// this if, else if, else is to deal with how Amazon sometimes puts summaries in different formats
				if (book.EditorialReviews.EditorialReview.Content !== undefined) {
					tempBook.summary = book.EditorialReviews.EditorialReview.Content;
				}
				else if (book.EditorialReviews.EditorialReview[0].Content !== undefined) {
					tempBook.summary = book.EditorialReviews.EditorialReview[0].Content;
				}
				else tempBook.summary = "Summary not available";
				tempBook.summary = tempBook.summary.replace(/<[^>]+>/g, '');

				// this is to get a cover image if available
				if (book.LargeImage.URL !== undefined) {
					tempBook.coverImg = book.LargeImage.URL;
				}
				else tempBook.coverImg = "placeholder.jpg";

				dummyBooks.push(tempBook);
			})
			return dummyBooks; 
		})
		.then(books => 
			this.setState({
				books,
				isLoading: false
			})
		)
	}

	render(){
		const { isLoading, books, page } = this.state;
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
										<Link to={`/addBook/${book.ASIN}`}>
											<div className="card">
											  <div className="card-content">
											    <div className="media">
											      <div className="media-left">
											        <figure className="image">
														<img src={book.coverImg} alt="Placeholder" className="coverImg" />
													</figure>
											      </div>
											      <div className="media-content">
											        <p className="title is-6">{book.title}</p>
											        <p className="subtitle is-7">by {book.author}</p>
											      </div>
											    </div>
											    <div className="content">
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

export default AmazonBookSearch;