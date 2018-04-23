import React from "react";
import "./Home.css";
import 'bulma/css/bulma.css';
import { NavLink } from "react-router-dom";

class Home extends React.Component {
	render() {
		return(
			<div>
				<section className="hero is-large">
				    <div className="hero-body">
				    	<div className="columns">
							<div className="column is-half has-text-light">
								<p className="title is-1 has-text-light">Find books you love!</p>
								<p className="subtitle is-4 has-text-light has-text-justified">We use Nancy Pearl's research discovering why people love the books they read to help you find what to read next. You tell us what books you love, and we find books that are similar using the Four Doorways theory.</p>
								<div className="columns">
									<div className="column is-half">
										<NavLink to='/login'>	
											<div className="button is-medium is-success">
											    <span className="icon">
											      <i className="far fa-thumbs-up"></i>
											    </span>
											    <span>Get Started</span>
											</div>
										</NavLink>
									</div>
									<div className="column is-half">
										<NavLink to='/about'>	
											<div className="button is-medium is-link" >
											    <span className="icon">
											      <i className="fas fa-graduation-cap"></i>
											    </span>
											    <span>Learn more</span>
											</div>
										</NavLink>	
									</div>
								</div>
							</div>
				      	</div>
				    </div>
			  	</section>
		  	</div>
		  	)
	}
}

export default Home;