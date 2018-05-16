import React, {Component} from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import _ from 'lodash';

import './DoorwayList.css';

const Descriptions = {
    "story" : "Story",
    "character" : "Character",
    "setting" : "Setting",
    "language" : "Language"
}

const SortableItem = SortableElement(({value}) => {
    let icon;
    switch (value) {
        case Descriptions.character:
            icon = "CharacterCardIcon";    
            break;
        case Descriptions.language:
            icon = "LanguageCardIcon";    
            break;
        case Descriptions.setting:
            icon = "SettingCardIcon";    
            break;
        case Descriptions.story:
            icon = "StoryCardIcon";    
            break;
        default: break;
  }
  return (
    <div className="level is-mobile boxElement">
        <div className="level-left">
            <div className="level-item contain">
                <img src={ require(`../assets/images/${icon}.svg`) } alt="DoorwayIcon" className="contain" />
            </div>
        </div>
        <div className="level-item">
            <p className="level-item"><strong>{value}</strong></p>
        </div>
        <div className="level-right">
            <div className="level-item contain">
                <img src={ require(`../assets/images/drag-reorder.png`) } alt="Drag to Reorder Doorways" className="contain-small" />
            </div>
        </div>
    </div>

    );
});

const SortableList = SortableContainer(({items}) => {
    return (
        <div className="containerBox" id="containerBox" >
            <span id="listHeader">Rank doorways for this book</span>
            {items.map((value, index) => (
                    <SortableItem key={`item-${index}`} index={index} value={value} />
            ))}
        </div>
  );
});

export default class DoorwayList extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
            items: [Descriptions.story, Descriptions.character, Descriptions.setting, Descriptions.language],
            default: true,
            doorwaysScore: []
        };      
    };

    changeIndicesToValues(objectWithIndices) {
        return(_.mapValues(objectWithIndices, function(value) {
            if (value === "0"){return "4"}
            else if (value === "1"){return "3"}
            else if (value === "3"){return "1"}
            else return value;
        }))    
    };

    changeDescriptionToDoorway(objectWithDescription) {
        return(_.mapKeys(objectWithDescription, function(value, key) {
            if (key === Descriptions.story){return "story"}
            else if (key === Descriptions.language){return "language"}
            else if (key === Descriptions.character){return "character"}
            else if (key === Descriptions.setting){return "setting"}
            else return key;
        }))
    };

    addPatchOperation(rating) {
        return {"doorwaysScore" : rating}
    }

    addNewRatingToArray(newRating) {
        let arrayIndex = _.findIndex(this.state.doorwaysScore, ['uid', this.state.user.uid]);
        if (arrayIndex !== -1){
            let newArray = this.state.doorwaysScore.slice();
            console.log(`newArray before splice is: ${JSON.stringify(newArray)}`)
            newArray.splice(arrayIndex, 1, newRating);
            console.log(`newArray after splice is: ${JSON.stringify(newArray)}`)
            return newArray;
        } else {
            if (!this.state.doorwaysScore){
                this.setState({
                    doorwaysScore: []
                })
            }
            let newArray = this.state.doorwaysScore.slice();
            newArray.push(newRating);
            return newArray;
        }
    }   
    
    async submitRating(newRating){
        let newDoorwaysScoresArray = this.addNewRatingToArray(newRating);
        let bodyReadyToSubmit = this.addPatchOperation(newDoorwaysScoresArray);
        console.log(`the new array about to submit is: ${JSON.stringify(bodyReadyToSubmit)}`); 
        try {
			await fetch(`http://www.bookmatch.tk:3030/book/${this.props.id}`, {
                body: JSON.stringify(bodyReadyToSubmit),
                method: 'PATCH',
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json'
				}				
            });
            this.props.fetchBook();
		}
		catch(e) {
			console.log('error: ' + e);
        };
        
    }

    getUserDoorwaysScoreFromArray(arrayWithAlLScores){
        return _.find(arrayWithAlLScores, {uid: this.state.user.uid});
    }
    removeUID(doorwaysScoreWithUID){
        return _.omit(doorwaysScoreWithUID, "uid");
    }
    convertScoresToIndices(objectWithScores){
        return(_.mapValues(objectWithScores, function(value) {
            if (value === "4"){return "0"}
            else if (value === "3"){return "1"}
            else if (value === "1"){return "3"}
            else return value;
        }))    
    }
    convertDoorwaysToDescriptions(doorwaysWordsOnly){
        return(_.mapKeys(doorwaysWordsOnly, function(value, key) {
            if (key === "story"){return Descriptions.story}
            else if (key === "language"){return Descriptions.language}
            else if (key === "character"){return Descriptions.character}
            else if (key === "setting"){return Descriptions.setting}
            else return key;
        }))
    }

    setUserDoorwaysToItemsArray(userDoorwaysDescriptions){
        return Object.keys(userDoorwaysDescriptions);
    }
    
    updateRating(newRating) {
        let ratingWithValues = this.changeIndicesToValues(newRating);
        let ratingWithValuesAndDoorways = this.changeDescriptionToDoorway(ratingWithValues);
        this.submitRating(ratingWithValuesAndDoorways);
    };

    changeDoorwaysScoreToItems(doorwaysScoreFromDatabase) {
        let userDoorwaysScoresWithUID = this.getUserDoorwaysScoreFromArray(doorwaysScoreFromDatabase);
        let UserScoresWithoutUID = this.removeUID(userDoorwaysScoresWithUID);
        let userDoorwaysIndices = this.convertScoresToIndices(UserScoresWithoutUID);
        let userDoorwaysDescriptions = this.convertDoorwaysToDescriptions(userDoorwaysIndices);
        return this.setUserDoorwaysToItemsArray(userDoorwaysDescriptions);
    }

    addClassToContainer() {
        if (this.state && this.state.default === false) {
            let element = document.getElementById("containerBox");
            if (element.classList){
                if (!element.classList.contains("submitted")){
                    element.classList.add("submitted");
                }
            }            
        }
    }

    changeContainerHeader() {
        if (this.state && this.state.default === false){
            let element = document.getElementById("listHeader");
            if (element && element.textContent === "Rank doorways for this book"){
                element.textContent = "Your rankings"
            }
        }
    }
    
    onSortEnd = ({oldIndex, newIndex}) => {
        const {items} = this.state;
        this.setState({
            items: arrayMove(items, oldIndex, newIndex),
        });
        if (this.state.user){
            let invertedItems = _.invert(this.state.items)
            let newRating = {"uid":this.props.user.uid, ...invertedItems};
            this.updateRating(newRating);
        }
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.doorwaysScore !== prevState.doorwaysScore) {
            return {
			    doorwaysScore: nextProps.doorwaysScore
            };
        }
        if (nextProps.user !== prevState.user) {
            return {
                user: nextProps.user
            };
        }	
        return null;
    }
    
    componentDidMount(){

    }

    componentDidUpdate(){
        if (this.state.user && this.state.doorwaysScore && this.state.default === true){
            if (_.some(this.state.doorwaysScore, ["uid", this.state.user.uid])) {
                let items = this.changeDoorwaysScoreToItems(this.state.doorwaysScore);
                if (items !== this.state.items) {
                    this.setState({
                        items,
                        default: false
                    });
                }            
                else (console.log('something is weird'));
            }
        }
        this.addClassToContainer();
        this.changeContainerHeader();
    }
    
    render() {
        return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} lockAxis='y' lockToContainerEdges={true} pressDelay={50} helperclass='helper' />;
    }
}