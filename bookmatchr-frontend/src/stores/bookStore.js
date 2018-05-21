import { observable, action, computed, flow, autorun, set } from 'mobx';
import _ from 'lodash';
import { changeDoorwaysScoreToItems, addNewRatingToArray, updateRating, submitRating } from '../containers/utils'
import { arrayMove } from 'react-sortable-hoc';

class BookStore {
    @observable book = {title: "Title", authors:[], tags:[], doorwaysScore:[]};
    @observable bookTitle = "";
    @observable userDoorwayRanking = ["Story", "Character", "Setting", "Language"];
    @observable doorwaysArray = [];
    @observable doorwaysAverage = {"characterAverage": 0, "languageAverage": 0, "settingAverage": 0, "storyAverage": 0};
    @observable rankingIsDefault = true;
    @observable allUsersDoorwaysForBook = [];
    @observable state = "pending";

    
    constructor(rootStore) {
        this.rootStore = rootStore; 
    };

    @action
    setUser = authUser => {
        if (authUser){
            console.log('user is authorized');
            if (this.book.doorwaysScore && this.rootStore && this.rootStore.sessionStore && this.rootStore.sessionStore.authUser) {
                if(_.find(this.book.doorwaysScore, {"uid": this.rootStore.sessionStore.authUser.uid})){
                    console.log(`found your ranking, changing default to false: ${_.find(this.book.doorwaysScore, {"uid": this.rootStore.sessionStore.authUser.uid})}`)
                    this.changeRankingDefault(false);
                    const userScoresFromDatabaseConvertedToIndex = changeDoorwaysScoreToItems(_.find(this.book.doorwaysScore, {"uid": this.rootStore.sessionStore.authUser.uid}));
                    this.setUserDoorwayRanking(userScoresFromDatabaseConvertedToIndex);
                }
            }
        }
    }

    @action 
    setTitle = bookTitle => {
        this.bookTitle = bookTitle;
    }
    
    @action 
    setUserDoorwayRanking = userDoorwayRanking => {
        console.log(userDoorwayRanking)
        this.userDoorwayRanking.replace(userDoorwayRanking);
        console.log(`this.UDR: ${this.userDoorwayRanking}`)
    };
    
    @action
    changeRankingDefault = rankingIsDefault => {
        this.rankingIsDefault = rankingIsDefault;
    };

    @action
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setUserDoorwayRanking(arrayMove(this.userDoorwayRanking, oldIndex, newIndex));
        console.log(`this.uDR after setting it ${this.userDoorwayRanking}`)
        if(this.rootStore.sessionStore.authUser){
            //console.log(this.userDoorwayRanking)
            let invertedItems = _.invert(this.userDoorwayRanking.slice());
            //console.log(`inverted items: ${JSON.stringify(invertedItems)}`)
            let newRatingWithUID = {"uid":this.rootStore.sessionStore.authUser.uid, ...invertedItems}
            let afterUpdate = updateRating(newRatingWithUID);
            //console.log(`after updateRating: ${JSON.stringify(afterUpdate)}`);
            let newDoorwaysArray = addNewRatingToArray(afterUpdate, this.doorwaysArray, this.rootStore.sessionStore.authUser.uid);
            //console.log(`nDA: ${JSON.stringify(newDoorwaysArray)}`);         
            try {                
                submitRating(newDoorwaysArray, this.book.id)
                .then(this.submitRatingSuccess, this.submitRatingFailure)

            } catch (error) {
                this.state = error
            }
        }
    }
    
    @action.bound
    submitRatingSuccess(book){
        console.log(`in newbook return success: ${JSON.stringify(book.doorwaysScore)}`);
        this.book.doorwaysScore = book.doorwaysScore
    }

    @action.bound
    submitRatingFailure(error){
        console.log(error)
    }

    @action
    setBook = flow(function * (bookISBN) {
        this.state = "pending";
        if (bookISBN) {
            try {
                this.changeRankingDefault("true");
                this.setDoorwaysAverage(1,1,1,1);
                const bookData = yield fetch(`http://www.bookmatch.tk:3030/book?isbn10=${bookISBN}`);
                const JSONbookData = yield bookData.json();
                this.book = {title: JSONbookData.data[0].title, 
                    cover: JSONbookData.data[0].cover, 
                    authors: JSONbookData.data[0].authors, 
                    ISBN10: JSONbookData.data[0].isbn10,
                    summary: JSONbookData.data[0].summary,
                    doorwaysScore: JSONbookData.data[0].doorwaysScore,
                    id: JSONbookData.data[0].id
                } //JSONbookData.data[0] );
                this.doorwaysArray =  JSONbookData.data[0].doorwaysScore;
                this.state = "done";
                if (this.book.doorwaysScore && this.rootStore && this.rootStore.sessionStore && this.rootStore.sessionStore.authUser) {
                    if(_.find(this.book.doorwaysScore, {"uid": this.rootStore.sessionStore.authUser.uid})){
                        this.changeRankingDefault(false);
                        const userScoresFromDatabaseConvertedToIndex = changeDoorwaysScoreToItems(_.find(this.book.doorwaysScore, {"uid": this.rootStore.sessionStore.authUser.uid}));
                        this.setUserDoorwayRanking(userScoresFromDatabaseConvertedToIndex);
                    }
                }
            } catch (error) {
                this.state = error
            }
        }
        
    })

    @action
    setDoorwaysAverage(characterAverage, languageAverage, settingAverage, storyAverage){
        console.log(`in sDA in bookStore: ${characterAverage}, ${languageAverage}, ${settingAverage}, ${storyAverage}`)
        set(this.doorwaysAverage, {characterAverage: characterAverage, languageAverage: languageAverage, settingAverage: settingAverage, storyAverage: storyAverage})
    }

    //@computed get 
    //getDoorwaysAverages() {
    //    console.log(`computing averages`)
    //    let array = this.doorwaysArray;
    //    if (array) {
    //        let characterTotal = 0, languageTotal = 0, settingTotal = 0, storyTotal = 0;
    //        _.forEach(array, function(value, key) {
    //            _.forEach(value, function(innerValue, innerKey){  
    //                switch (innerKey) {
    //                    case "character":
    //                        characterTotal = characterTotal + parseInt(innerValue, 10);
    //                        break;
    //                    case "language":
    //                        languageTotal = languageTotal + parseInt(innerValue, 10);    
    //                        break;
    //                    case "setting":
    //                        settingTotal = settingTotal + parseInt(innerValue, 10);
    //                        break;
    //                    case "story":
    //                        storyTotal = storyTotal + parseInt(innerValue, 10);
    //                        break;
    //                    default: break;
    //                }
    //            });
    //        });
    //        let characterAverage = characterTotal/array.length;
    //        let languageAverage = languageTotal/array.length;
    //        let settingAverage = settingTotal/array.length;
    //        let storyAverage = storyTotal/array.length;
    //        return {"characterAverage" : characterAverage, "languageAverage": languageAverage, "settingAverage" : settingAverage, "storyAverage" : storyAverage};
    //    }
    //};
    
}

export default BookStore;