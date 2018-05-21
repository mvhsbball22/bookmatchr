import React from "react";
import { withRouter } from "react-router";

import "./ShowBook.css";
import 'bulma/css/bulma.css';

//dummy import to get placeholder images
import DoorwayList from "./DoorwayList";
import DoorwaysPieChart from './DoorwaysPieChart';

import { observer,  inject } from "mobx-react";
import { observable } from 'mobx';
import TitleView from "./TitleView";
import CoverView from "./CoverView";
import AuthorsView from "./AuthorsView";
import AmazonBuyButton from "./AmazonBuyButton";
import SummaryView from "./SummaryView";

@inject('sessionStore', 'bookStore')
@observer
@withRouter
class ShowBook extends React.Component {
	@observable book = {authors:[]};
	
	async componentDidMount(){
		const {bookStore} = this.props;
		await bookStore.setBook(this.props.match.params.id);
	}

	componentWillReceiveProps(nextProps) {
		const {bookStore, sessionStore} = nextProps;
		bookStore.setBook(this.props.match.params.id);
		if (sessionStore.authUser === null) {
			bookStore.setUserDoorwayRanking(["Story", "Character", "Setting", "Language"]);
			bookStore.changeRankingDefault(true)
		}
	}

	render() {
		const {bookStore} = this.props;

		return (
			<div className="columns">	
				<div className="column is-2">
				
				</div>
				<div className="column is-8">
					<div className="level">
						<div className="column is-one-fifth">
							<figure className="image is-4x5 is-padded">
								<CoverView />								
							</figure>
						</div>
						<div className="column">
							<div className="columns">
								<div className="column is-size-4 has-text-left">
									<TitleView />
								</div>
							</div>
							<div className="columns">
								<div className="column has-text-left">
									<AuthorsView />
								</div>
							</div>
							<div className="columns">
								<div className="column has-text-left">
									<AmazonBuyButton />
								</div>
							</div>
						</div>
					</div>
					<div className="level">					
						<div className="has-text-justified">
							<SummaryView />
						</div>	
					</div>
					<div className="level">
						<div className="column is-two-fifths">
							<div>
								<DoorwaysPieChart doorwaysScoreArray={bookStore.book.doorwaysScore} />
							</div>
						</div>
						<div className="column">
							<div>
								<DoorwayList />
							</div>
						</div>	
					</div>
					<div className="column is-narrow">

					</div>
				</div>
			</div>
		);
	}
}

export default ShowBook;
