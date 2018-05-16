import React from "react";

import "./ShowBook.css";
import 'bulma/css/bulma.css';

//dummy import to get placeholder images
import DoorwayList from "./DoorwayList";
import DoorwaysPieChart from './DoorwaysPieChart';

import AmazonBuyButton from '../assets/images/AmazonBuyButton.gif';

class ShowBook extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			authors: [],
			doorwaysScore: [{}]
		};
		this.fetchBook = this.fetchBook.bind(this);
	}

	async fetchBook() {

		// Getting the number of books and setting state to reflect that number
		fetch(`http://www.bookmatch.tk:3030/book?isbn10=${this.props.match.params.id}`)
			.then(response => response.json())
			.then(parsedJSON =>
				this.setState({
					id: parsedJSON.data[0].id,
					title: parsedJSON.data[0].title,
					authors: parsedJSON.data[0].authors,
					ISBN10: parsedJSON.data[0].isbn10,
					ISBN13: parsedJSON.data[0].isbn13,
					summary: parsedJSON.data[0].summary,
					cover: parsedJSON.data[0].cover,
					doorwaysScore: parsedJSON.data[0].doorwaysScore
				})
			);
	}

	handleUpdate() {

	}
	
	componentDidMount() {
		this.fetchBook();
	}

	componentDidUpdate(prevProps, prevState) {

	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.user !== prevState.user) {
		  return {
			user: nextProps.user
		  };
		}	
		if (nextProps.doorwaysScore !== prevState.doorwaysScore) {
			return {
			  doorwaysScore: nextProps.doorwaysScore
			};
		  }	
		return null;
	}

	render() {
		return (
		<div className="columns">	
			<div className="column is-2">
			
			</div>
			<div className="column is-8">
				<div className="level">
					<div className="column is-one-quarter">
						<figure className="image is-4x5 is-padded">
							<img src={this.state.cover} alt="Book Cover" className="max195" />
						</figure>
					</div>	
					<div className="column is-one-quarter">
						<div className="is-size-4 has-text-left">
							{this.state.title}
						</div>
						<div className="has-text-left">
							<span>by </span>{this.state.authors.map((author, i) => <span key={i}> {author.name}  </span>)}
						</div>
						<br />
						<div className="has-text-left">
							<a href={`http://www.amazon.com/dp/${this.state.ISBN10}/?tag=bookmatchr-20`}><img src={AmazonBuyButton} alt="Buy from Amazon!" /></a>
						</div>
					</div>
					<div className="column is-one-quarter">
						<div>
							<DoorwaysPieChart doorwaysScoreArray={this.state.doorwaysScore} />
						</div>
					</div>
					<div className="column is-one-quarter">
						<div>
							<DoorwayList user={this.state.user} id={this.state.id} doorwaysScore={this.state.doorwaysScore} fetchBook={this.fetchBook} />
						</div>
					</div>	
				</div>
				<div className="has-text-justified">
					{this.state.summary}
				</div>
				<div className="column is-narrow">

				</div>
			</div>
		</div>
		);
	}
}

export default ShowBook;
