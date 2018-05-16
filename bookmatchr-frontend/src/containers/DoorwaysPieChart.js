import React from 'react';
import { ResponsivePie } from '@nivo/pie';
import _ from 'lodash';


export default class DoorwaysPieChart extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            doorwaysAverages : {
                characterAverage: 1,
                languageAverage: 1,
                settingAverage: 1,
                storyAverage: 1
            } 
        };
    };
    
    getDoorwaysAverages(userDoorwaysArray) {
        if (userDoorwaysArray){
            let characterTotal = 0, languageTotal = 0, settingTotal = 0, storyTotal = 0;
            _.forEach(userDoorwaysArray, function(value, key) {
                _.forEach(value, function(innerValue, innerKey){                              
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
            let characterAverage = characterTotal/userDoorwaysArray.length;
            let languageAverage = languageTotal/userDoorwaysArray.length;
            let settingAverage = settingTotal/userDoorwaysArray.length;
            let storyAverage = storyTotal/userDoorwaysArray.length;
            return {"characterAverage" : characterAverage, "languageAverage": languageAverage, "settingAverage" : settingAverage, "storyAverage" : storyAverage};
        }
    };

    componentDidMount(){
        let doorwaysAverages = this.getDoorwaysAverages(this.props.doorwaysScoreArray);
        this.setState({ doorwaysAverages });
    };

    componentDidUpdate(){
        let doorwaysAverages = this.getDoorwaysAverages(this.props.doorwaysScoreArray);
        if (!_.isEqual(this.state.doorwaysAverages, doorwaysAverages)){
            this.setState({ doorwaysAverages });
        }
    };
    
    render(){
        return(
            <div style={{ height: 250 }}>
                <ResponsivePie
                    data={[
                        {
                          "id": "character",
                          "label": "character",
                          "value": this.state.doorwaysAverages ? this.state.doorwaysAverages.characterAverage/10 : 1,
                          "color": "hsl(79, 70%, 50%)"
                        },
                        {
                          "id": "language",
                          "label": "language",
                          "value": this.state.doorwaysAverages ? this.state.doorwaysAverages.languageAverage/10 : 1,
                          "color": "hsl(165, 70%, 50%)"
                        },
                        {
                          "id": "setting",
                          "label": "setting",
                          "value": this.state.doorwaysAverages ? this.state.doorwaysAverages.settingAverage/10 : 1,
                          "color": "hsl(218, 70%, 50%)"
                        },
                        {
                          "id": "story",
                          "label": "story",
                          "value": this.state.doorwaysAverages ? this.state.doorwaysAverages.storyAverage/10 : 1,
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
