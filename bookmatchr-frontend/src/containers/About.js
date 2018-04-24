import React from 'react';

// import images for the layour
import charactersSectionHeader from "../images/characters-section-header.jpg"

class About extends React.Component {

	render() {
		return (
		  	<div>
			  	<section className="section">
			    	<div className="columns">
			    		<div className="column is-8 is-offset-2">
				      		<h1 className="title">Overview</h1>
			      			<h2 className="subtitle">
			        			The Four doorways theory
			     			</h2>
			     			<div className="has-text-justified">
			     				It seems to me that all works of fiction and narrative nonfiction are broadly made up of four experiential elements: story, character, setting, and language. I call these “doorways,” because when we open a book, read the first few pages, and choose to go on, we enter the world of that book. And I’ve come to believe we can help readers better choose their next book by looking at the proportion of these four elements. ~ Nancy Pearl
		    				</div>
		    			</div>
		    		</div>
		  		</section>
			  	<div className="columns">
			    	<div className="column">
			      		<h1 className="title">Characters</h1>
		      			<h2 className="subtitle">
		        			The people who matter
		     			</h2>
		    		</div>	

			    	<div className="column">
			      		<h1 className="title">Language</h1>
		      			<h2 className="subtitle">
		        			Prose that sings
		     			</h2>
		    		</div>  

			    	<div className="column">
			      		<h1 className="title">Setting</h1>
		      			<h2 className="subtitle">
		        			Whens and Wheres
		     			</h2>
		    		</div>

			    	<div className="column">
			      		<h1 className="title">Story</h1>
		      			<h2 className="subtitle">
		        			Why we turn pages
		     			</h2>
		    		</div>

		  		</div>	
	  		</div>	
		)
	}

}

export default About;