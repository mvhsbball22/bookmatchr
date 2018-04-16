import React, { Component } from 'react';
import { NavLink, Route } from "react-router-dom";
import 'bulma/css/bulma.css';

import './App.css';

import BookFetch from './containers/BookFetch.js'
import Home from './containers/Home.js'
import ShowBook from './containers/ShowBook.js'
import FakeRatings from './containers/FakeRatings.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="navbar">
          <div className="navbar-brand">
            <div className="navbar-item">
              <NavLink to='/'>Bookmatchr</NavLink>
            </div>
            <div className="navbar-start">
              <div className="navbar-item">
                <NavLink to='/books'>Books</NavLink>
              </div>
            </div>
          </div>

        </nav>
        <Route exact path='/' component={Home} />
        <Route exact path='/books' component={BookFetch} />
        <Route path='/book/:id' component={ShowBook} />

      </div>
    );
  }
}

export default App;
