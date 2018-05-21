import React, { Component } from 'react';
import { NavLink, Route, withRouter } from "react-router-dom";
import 'bulma/css/bulma.css';

import './App.css';

import BookFetch from './containers/BookFetch.js';
import Home from './containers/Home.js';
import ShowBook from './containers/ShowBook.js';
// import FakeRatings from './containers/FakeRatings.js'
import About from './containers/About.js';
import GoogleLogin from './containers/GoogleLogin.js';
import FacebookLogin from './containers/FacebookLogin.js';
import EmailLogin from './containers/EmailLogin.js';
import BookSearch from './containers/BookSearch.js';
import AddBook from './containers/AddBook.js';
import { inject, observer } from 'mobx-react';

import firebase, { auth } from './containers/firebase';

@withRouter
@inject('sessionStore', 'bookStore', 'userStore')
@observer
class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      dropdownVisible: false
    }
    this.logout = this.logout.bind(this);
    this.showDropdown = this.showDropdown.bind(this);
    this.hideDropdown = this.hideDropdown.bind(this);
  } 


  
  logout() {
    const { sessionStore } = this.props;
    auth.signOut()
      .then(() => {
        sessionStore.setAuthUser(null);
        this.forceUpdate();
      })

  }
  

  authListener() {
    const { sessionStore } = this.props;
    
    firebase.auth().onAuthStateChanged((user => {
      if(user) {
        sessionStore.setAuthUser(user);
      } else {
        sessionStore.setAuthUser(null);
        this.forceUpdate();
      }

    }))
  }

  showDropdown(event) {
    event.preventDefault();

    this.setState({showDropdown: true}, () => {
      document.addEventListener('click', this.hideDropdown);
    });
  }

  hideDropdown(event) {
    if (this.dropdownMenu !== null && !this.dropdownMenu.contains(event.target)) {
      this.setState({ showDropdown: false }, () => {
        document.removeEventListener('click', this.hideDropdown);
      });
    }

  }

  componentDidMount() {
    this.authListener();
  }

  render() {
    const { sessionStore } = this.props;
    const user = sessionStore.authUser;
    const loginLink = user ? (            
        <div className="navbar-item">  
          <a onClick={this.logout} style={{color: 'black'}}>Logout</a>            
        </div>
    ) : (
      <div 
        className={this.state.showDropdown ? "dropdown is-right is-active" : "dropdown is-right"} 
        onClick={this.showDropdown}
        ref={(element) => {
          this.dropdownMenu = element;
        }}
      >
        <div className="dropdown-trigger">
          <a aria-haspopup="true" aria-controls="dropdown-menu" style={{color: 'black'}}>
            <span>Login</span>
            <span className="icon is-small">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </a>
        </div>
        <div className="dropdown-menu" id="dropdown-menu2" role="menu">
          <div className="dropdown-content">
            <div className="dropdown-item">
              <GoogleLogin />
              <FacebookLogin />
            </div>
            <hr className="dropdown-divider" />
            <div className="dropdown-item">
              <EmailLogin />
            </div>
          </div>
        </div>
      </div>
    );

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
            <div className="navbar-item">
              {loginLink}
            </div>
          </div>

        </nav>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
        <Route exact path='/books' component={BookFetch} />
        <Route path='/book/:id' render={(props) => ( <ShowBook {...props} user={this.state.user} /> )} />
        <Route path='/search' component={BookSearch} />
        <Route path='/addBook/:id' component={AddBook} />

      </div>
    );
  }
}

export default App;
