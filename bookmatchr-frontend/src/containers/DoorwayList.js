import React, {Component} from 'react';
import { Observer } from "mobx-react";
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import './DoorwayList.css';
import { observer, inject } from 'mobx-react';
import { toJS, autorun } from 'mobx';

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
            <i className="fas fa-bars"></i>
            </div>
            <div className="level-item contain">
                <img src={ require(`../assets/images/${icon}.svg`) } alt="DoorwayIcon" className="contain" />
            </div>
        </div>
        <div className="level-right">
            <p className="level-item"><strong>{value}</strong></p>
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

@inject('sessionStore', 'bookStore')
@observer
export default class DoorwayList extends Component {

    constructor(props) {
        super(props);
        autorun(() => {
            this.toggleClassContainer();
            this.toggleContainerHeader();
        //    console.log(`ranking is default: ${this.props.bookStore.rankingIsDefault}`)
        });
    }

    toggleClassContainer() {
        if (this.props.bookStore.rankingIsDefault === false) {
            let element = document.getElementById("containerBox");
            if (element.classList){
                if (!element.classList.contains("submitted")){
                    element.classList.add("submitted");
                }
            }            
        }
        else if (this.props.bookStore.rankingIsDefault === true) {
            let element = document.getElementById("containerBox");
            if (element && element.classList){
                if (element.classList.contains("submitted")){
                    element.classList.remove("submitted");
                }
            }            
        }
    }

    toggleContainerHeader() {
        if (this.props.bookStore.rankingIsDefault === false){
            let element = document.getElementById("listHeader");
            if (element && element.textContent === "Rank doorways for this book"){
                element.textContent = "Your rankings"
            }
        }
        else if (this.props.bookStore.rankingIsDefault === true){
            let element = document.getElementById("listHeader");
            if (element && element.textContent === "Your rankings"){
                element.textContent = "Rank doorways for this book"
            }
        }
    }
    
    render() {
        const {bookStore} = this.props;
        return <Observer>{() => <SortableList items={toJS(bookStore.userDoorwayRanking)} onSortEnd={bookStore.onSortEnd} lockAxis='y' lockToContainerEdges={true} pressDelay={20} helperclass='helper' />}</Observer>;

    }
}