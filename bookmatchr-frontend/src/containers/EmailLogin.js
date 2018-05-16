import React, { Component } from 'react';
import firebase from 'firebase';

export default class EmailLogin extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
            errorMessage: ''
        };
        this.emailLogin = this.emailLogin.bind(this);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
        this.emailLogin = this.emailLogin.bind(this);
        this.emailSignup = this.emailSignup.bind(this);
    }
    
    emailLogin(e){
        console.log(this.state.email + this.state.password);
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch((err) => {
                this.setState({
                    errorMessage: err.message
                })
            });

    }

    emailSignup(e){
        console.log(this.state.email + this.state.password);
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .catch((err) => {
                this.setState({
                    errorMessage: err.message
                })
            })
    }

    render(){
        return(
            <div className="form">
                <div className="field">
                    <p className="control">
                        <input name="email" required className="input is-small" type="email" placeholder="Email" onChange={this.handleChange} />
                    </p>
                </div>
                <div className="field">
                    <p className="control">
                        <input name="password" className="input is-small" type="password" placeholder="Password" onChange={this.handleChange} required />
                    </p>
                </div>
                <span className="has-text-danger is-size-7">{this.state.errorMessage}</span>
                <div className="field is-grouped is-grouped-centered">
                    <p className="control">
                        <a className="button is-primary is-small" onClick={this.emailLogin}>
                            Log-In
                        </a>
                    </p>
                    <p className="control">
                        <a className="button is-light is-small" onClick={this.emailSignup}>
                            Sign Up
                        </a>
                    </p>
                </div>
                <div className="">
                    <p className="ForgotPassword" style={{'fontSize':'.75rem'}}>
                        Forgot Password
                    </p>
                </div>
            </div>
            
        )
    }
}