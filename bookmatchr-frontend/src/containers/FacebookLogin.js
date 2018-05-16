import React, { Component } from 'react';
import firebase from 'firebase';

import {FacebookLoginButton} from 'react-social-login-buttons';


export default class FacebookLogin extends Component {
    constructor(props){
        super(props);
        this.facebookLogin = this.facebookLogin.bind(this);
    }

    facebookLogin(){
        let provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(function(result){
                const user = result.user
                this.setState({user})
            })
            .catch(function(error){
                console.log(error);
            })
    }
    render() { 
        return(
            <div>
                <FacebookLoginButton style={{'fontSize': '70%'}} onClick={this.facebookLogin} size="30px" iconSize="20px"  />
            </div>
        )
    }
}