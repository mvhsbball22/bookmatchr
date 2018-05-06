import React from 'react';
import "bulma/css/bulma.css";

class AddBook extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			book: {}
		}
	}

	getBookData(){

		// dummy variable to fill with information from fetch before adding to state
		let dummyBook = {};

		// get data from amazon API and put it into the dummyBook variable
		fetch('http://www.bookmatch.tk:3030/amazon-book-details/' + this.props.match.params.id)
		.then((fetchedData) => fetchedData.json())
		.then(function(parsedData) {
			
			dummyBook.isbn10 = parsedData.result.ItemLookupResponse.Items.Item.ASIN;
			dummyBook.title = parsedData.result.ItemLookupResponse.Items.Item.ItemAttributes.Title;
			dummyBook.publishedDate = parsedData.result.ItemLookupResponse.Items.Item.ItemAttributes.PublicationDate;
			//cycle through each of the authors
			let tempAuthors=[]
			
			//check to see whether I need to cycle through authors for multiple authors, otherwise just add author
			if (Array.isArray(parsedData.result.ItemLookupResponse.Items.Item.ItemAttributes.Author)){
				parsedData.result.ItemLookupResponse.Items.Item.ItemAttributes.Author.forEach(function(element, index){
					tempAuthors.push({name : parsedData.result.ItemLookupResponse.Items.Item.ItemAttributes.Author[index]})
				})
			}
			else tempAuthors = [{name: parsedData.result.ItemLookupResponse.Items.Item.ItemAttributes.Author}];
			//push the result of either the array or not to the dummyBook
			dummyBook.authors=tempAuthors;
				
			
			//grab the cover URL or set to placeholder if not available
			if (parsedData.result.ItemLookupResponse.Items.Item.LargeImage.URL !== undefined) {
					dummyBook.cover = parsedData.result.ItemLookupResponse.Items.Item.LargeImage.URL;
				}
				else dummyBook.cover = "placeholder.jpg";

			//if statements to deal with Amazon's different ways of storing reviews
			if (parsedData.result.ItemLookupResponse.Items.Item.EditorialReviews.EditorialReview.Content !== undefined) {
					dummyBook.summary = parsedData.result.ItemLookupResponse.Items.Item.EditorialReviews.EditorialReview.Content;
				}
				else if (parsedData.result.ItemLookupResponse.Items.Item.EditorialReviews.EditorialReview[0].Content !== undefined) {
					dummyBook.summary = parsedData.result.ItemLookupResponse.Items.Item.EditorialReviews.EditorialReview[0].Content;
				}
				else dummyBook.summary = "Summary not available";
				dummyBook.summary = dummyBook.summary.replace(/<[^>]+>/g, '');
			
			console.log(dummyBook)
			return dummyBook;
		})
		.then(book => {
			this.setState({
				book
			})
		}
		)

	}

	async submitBook(){
		//const book = this.state.book
		//event.preventDefault();
		console.log(`We will submit book ${this.state.book.title}`)
        try {
			const returnedBook = await fetch('http://www.bookmatch.tk:3030/book', {
				method: 'POST',
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(this.state.book)
			})
			
			const returnedBookJSON = await returnedBook.json();
			console.log('ReturnedBookJSON.data.isbn10: ' + JSON.stringify(returnedBookJSON));

			if (returnedBookJSON.data && returnedBookJSON.data[0]) {
				this.props.history.push({
					pathname: '/book/' + returnedBookJSON.data[0].isbn10, 
					state: { existed: returnedBookJSON.data[0].exists} 
				})
			}
			else if (returnedBookJSON.isbn10) {
				this.props.history.push({
					pathname: '/book/' + returnedBookJSON.isbn10, 
					state: { existed: returnedBookJSON.exists} 
				})
			}
		}
		catch(e) {
			console.log('error: ' + e);
		};
		
		
		//eslint-disable-next-line


	}

	componentDidMount(){
		
		this.getBookData();		

	}

	render() {
		const {book} = this.state;
		return(
		<div>
			<div>{book.title} </div>
			<button className="button" onClick={this.submitBook.bind(this)}>Click Button to add book</button>
		</div>
		)
	}
}

export default AddBook;
