import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import "bulma/css/bulma.css"

import AmazonBookSearch from "./AmazonBookSearch.js"

class BookSearch extends React.Component {
	static contextTypes = {
		router: PropTypes.object
	}

	constructor(props, context) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state ={
			searchQuery: ""
		}
	}

	handleChange(event) {
		this.setState({searchQuery: event.target.value})
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log("I'm submitting");
		this.setState({
			books: []
		})
		this.context.router.history.push('/search/' + this.state.searchQuery + '/1');

	}



	render(){
		return(
			<div>
				<section className="section">
					<div className="columns">
						<div className="column is-one-third" />	
						<div className="column is-one-third">
							<div className="tile">
								<form onSubmit={this.handleSubmit}>
									<div className="field">
										<input className="input" type="text" name="searchQuery" value={this.state.searchQuery} onChange={this.handleChange.bind(this)}/>
										<input className="button" type="submit" value="Search" />
									</div>
								</form>
							</div>
						</div>
						<div className="column is-one-third" />	
					</div>
				</section>	
				<Route exact path="/search/:query/:page" component={AmazonBookSearch} />
			</div>
		)
	}
}

export default BookSearch;