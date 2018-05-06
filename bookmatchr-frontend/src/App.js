import React, { Component } from 'react';
import { NavLink, Route } from "react-router-dom";
import 'bulma/css/bulma.css';

import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';

import './App.css';

import BookFetch from './containers/BookFetch.js'
import Home from './containers/Home.js'
import ShowBook from './containers/ShowBook.js'
// import FakeRatings from './containers/FakeRatings.js'
import About from './containers/About.js'
import Login from './containers/Login.js'
import BookSearch from './containers/BookSearch.js'
import AddBook from './containers/AddBook.js'

Amplify.configure(aws_exports);



class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      isLoggedIn: false
    }
  }

  componentWillMount(){
    console.log('App is about to mount, current logged in state is :' + this.state.isLoggedIn);
    Auth.currentAuthenticatedUser()
      .then((user) => {
        if (user!== undefined) {
          this.setState({isLoggedIn: true});
          console.log('This guy is logged in')
        }})
  }
  

  componentDidUpdate(){
    console.log("About to update, current logged in state is :" + this.state.isLoggedIn)
    Auth.currentUserInfo()
        .then((user) => {
          if ( (user!== undefined) && (this.state.isLoggedIn===false) ) {
            console.log(JSON.stringify(user.id));
            this.setState({isLoggedIn: true})
          }
          else if ( (user === undefined) && (this.state.isLoggedIn===true) ) {
            console.log("No user, so logging out");
            this.setState({isLoggedIn: false})
          }        
        })
  }

  render() {

    const isLoggedIn = this.state.isLoggedIn;

    const loginButton = isLoggedIn ? (

      <div className="navbar-item" >
          <NavLink to='/login' style={{color: 'black'}}>Logout</NavLink>
      </div>
      )
      :
      (
      <div className="navbar-item">
          <NavLink to='/login' style={{color: 'black'}}>Sign In</NavLink>
      </div>

    )

    return (
      <div className="App">
        <nav className="navbar is-light">
          <div className="navbar-brand">
            <div className="navbar-item">
              <NavLink to='/'><img src='/bookmatch_logo.png' alt="Our logo"/></NavLink>
            </div>
            <a role="button" className="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item is-black">
              <NavLink to='/books' style={{color: 'black'}}>Books</NavLink>
            </div>
            <div className="navbar-item">
              <NavLink to='/about' style={{color: 'black'}}>About</NavLink>
            </div>
            {loginButton}
          </div>

        </nav>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
        <Route exact path='/books' component={BookFetch} />
        <Route path='/book/:id' component={ShowBook} />
        <Route exact path='/login' component={Login} />
        <Route path='/search' component={BookSearch} />
        <Route path='/addBook/:id' component={AddBook} />

      </div>
    );
  }
}

export default App;
