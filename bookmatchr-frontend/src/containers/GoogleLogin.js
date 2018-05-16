import React, { Component } from 'react';
import firebase from 'firebase';

import {GoogleLoginButton} from 'react-social-login-buttons';


export default class GoogleLogin extends Component {
    constructor(props){
        super(props);
        this.googleLogin = this.googleLogin.bind(this);
    }

    googleLogin(){
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then((result) => {
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
                <GoogleLoginButton style={{'fontSize': '80%'}} onClick={this.googleLogin} size="30px" iconSize="20px"  />
            </div>
        )
    }
}