import _ from 'lodash';

const Descriptions = {
    "story" : "Story",
    "character" : "Character",
    "setting" : "Setting",
    "language" : "Language"
};

export function changeDoorwaysScoreToItems(userDoorwaysScore) {
    let UserScoresWithoutUID = removeUID(userDoorwaysScore);
    let userDoorwaysIndices = convertScoresToIndices(UserScoresWithoutUID);
    let userDoorwaysDescriptions = convertDoorwaysToDescriptions(userDoorwaysIndices);
    return setUserDoorwaysToItemsArray(userDoorwaysDescriptions);
};

export function removeUID(userDoorwaysScoresWithUID) {
    return _.omit(userDoorwaysScoresWithUID, "uid");
};

export function convertScoresToIndices(objectWithScores) {
    return(_.mapValues(objectWithScores, function(value) {
        if (value === "4"){return "0"}
        else if (value === "3"){return "1"}
        else if (value === "1"){return "3"}
        else return value;
    }))    
};

export function convertDoorwaysToDescriptions(doorwaysWordsOnly){
    return(_.mapKeys(doorwaysWordsOnly, function(value, key) {
        if (key === "story"){return Descriptions.story}
        else if (key === "language"){return Descriptions.language}
        else if (key === "character"){return Descriptions.character}
        else if (key === "setting"){return Descriptions.setting}
        else return key;
    }))
};

export function setUserDoorwaysToItemsArray(userDoorwaysDescriptions){
    return Object.keys(userDoorwaysDescriptions);
};

export function addNewRatingToArray(newRating, doorwaysArray, userId) {
    let arrayIndex = _.findIndex(doorwaysArray, ['uid', userId]);
    if (arrayIndex !== -1){
        let newArray = doorwaysArray.slice();
        newArray.splice(arrayIndex, 1, newRating);
        return newArray;
    } else {
        if (!doorwaysArray){
            doorwaysArray = [];
        }
        let newArray = doorwaysArray.slice();
        newArray.push(newRating);
        return newArray;
    }
};

export function changeIndicesToValues(objectWithIndices) {
    return(_.mapValues(objectWithIndices, function(value) {
        if (value === "0"){return "4"}
        else if (value === "1"){return "3"}
        else if (value === "3"){return "1"}
        else return value;
    }))    
};

export function addPatchOperation(rating) {
    return {"doorwaysScore" : rating}
};

export async function submitRating(newDoorwaysScoresArray, bookId){
    let bodyReadyToSubmit = addPatchOperation(newDoorwaysScoresArray);
    console.log(`the new array about to submit is: ${JSON.stringify(bodyReadyToSubmit)}`); 
    try {
        let newBook 
        await fetch(`http://www.bookmatch.tk:3030/book/${bookId}`, {
            body: JSON.stringify(bodyReadyToSubmit),
            method: 'PATCH',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }				
        })
        .then(response => newBook = response.json());
        return newBook;
        
    }
    catch(e) {
        console.log('error: ' + e);
    };
}

export function updateRating(newRating) {
    let ratingWithValues = changeIndicesToValues(newRating);
    let ratingWithValuesAndDoorways = changeDescriptionToDoorway(ratingWithValues);
    return ratingWithValuesAndDoorways;
}
    
export function changeDescriptionToDoorway(objectWithDescription) {
    return(_.mapKeys(objectWithDescription, function(value, key) {
        if (key === Descriptions.story){return "story"}
        else if (key === Descriptions.language){return "language"}
        else if (key === Descriptions.character){return "character"}
        else if (key === Descriptions.setting){return "setting"}
        else return key;
    }))
};
    