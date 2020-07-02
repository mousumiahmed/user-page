import React, { Component } from 'react'
import './App.css';
import DisplayPage from './components/DisplayPage.js';
import NavBar from './components/NavBar.js';
import SearchBar from './components/SearchBar.js';




class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <SearchBar/>
      </div>
    )
  }
}

export default App;
