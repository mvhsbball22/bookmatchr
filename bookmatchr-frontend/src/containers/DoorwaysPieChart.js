import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import { inject, observer, Observer } from 'mobx-react';
import { toJS, autorun, computed, observable, set, action } from 'mobx';
import _ from 'lodash';

const DoorwayAverages = {}

@inject('sessionStore', 'bookStore')
@observer
export default class DoorwaysPieChart extends React.Component {
    

    
    constructor(props) {
        super(props);
        autorun(() => {
            this.doorwaysAverage();
        });
    }
    
    doorwaysAverage(){
        const {bookStore} = this.props;
        console.log(toJS(this.props.bookStore.book.doorwaysScore))
        if (toJS(this.props.bookStore.book.doorwaysScore))
        {
            //console.log(`in array if with ${JSON.stringify(this.props.bookStore.book.doorwaysScore)}`)
                let characterTotal = 0, languageTotal = 0, settingTotal = 0, storyTotal = 0;
                _.forEach(toJS(this.props.bookStore.book.doorwaysScore), function(value, key) {
                    //console.log(`in foreach`)
                    _.forEach(value, function(innerValue, innerKey){
                        //console.log(`in foreach, foreach`)  
                        switch (innerKey) {
                            case "character":
                                characterTotal = characterTotal + parseInt(innerValue, 10);
                                break;
                            case "language":
                                languageTotal = languageTotal + parseInt(innerValue, 10);    
                                break;
                            case "setting":
                                settingTotal = settingTotal + parseInt(innerValue, 10);
                                break;
                            case "story":
                                storyTotal = storyTotal + parseInt(innerValue, 10);
                                break;
                            default: break;
                        }
                    });
                });
                console.log(characterTotal, languageTotal, settingTotal, storyTotal)
                let characterAverage = characterTotal/this.props.bookStore.book.doorwaysScore.length;
                let languageAverage = languageTotal/this.props.bookStore.book.doorwaysScore.length;
                let settingAverage = settingTotal/this.props.bookStore.book.doorwaysScore.length;
                let storyAverage = storyTotal/this.props.bookStore.book.doorwaysScore.length;
                console.log(characterAverage, languageAverage, settingAverage, storyAverage)
                bookStore.setDoorwaysAverage(characterAverage, languageAverage, settingAverage, storyAverage);
                this.DoorwayAverages = {characterAverage : characterAverage, languageAverage: languageAverage, settingAverage : settingAverage, storyAverage : storyAverage};
            }   
        //console.log(`${JSON.stringify(this.DoorwayAverages)}`)
        }
        
        //console.log(`the averages are: ${this.doorwaysAverage}`)

    render(){
        const {bookStore} = this.props;
        return(            
            <div style={{ height: 250 }}>
                    <ResponsivePie
                        data={[
                            {
                            "id": "character",
                            "label": "character",
                            "value": bookStore.doorwaysAverage ? toJS(bookStore.doorwaysAverage.characterAverage)/10 : 1,
                            "color": "hsl(79, 70%, 50%)"
                            },
                            {
                            "id": "language",
                            "label": "language",
                            "value": bookStore.doorwaysAverage ? toJS(bookStore.doorwaysAverage.languageAverage)/10 : 1,
                            "color": "hsl(165, 70%, 50%)"
                            },
                            {
                            "id": "setting",
                            "label": "setting",
                            "value": bookStore.doorwaysAverage ? toJS(bookStore.doorwaysAverage.settingAverage)/10 : 1,
                            "color": "hsl(218, 70%, 50%)"
                            },
                            {
                            "id": "story",
                            "label": "story",
                            "value": bookStore.doorwaysAverage ? toJS(bookStore.doorwaysAverage.storyAverage)/10 : 1,
                            "color": "hsl(104, 70%, 50%)"
                            }
                        ]}
                        margin={{
                            "top": 10,
                            "right": 10,
                            "bottom": 10,
                            "left": 10
                        }}
                        innerRadius={0.15}
                        padAngle={0.1}
                        cornerRadius={3}
                        colors="accent"
                        colorBy="id"
                        borderColor="inherit:darker(0.6)"
                        enableRadialLabels={false}
                        sliceLabel="id"
                        slicesLabelsSkipAngle={10}
                        slicesLabelsTextColor="#333333"
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                        isInteractive={true}
                        tooltipFormat={".0%"}
                    />
            </div>
        )
    };
};
