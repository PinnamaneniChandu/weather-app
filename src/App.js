import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { BoxList } from './components/BoxList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <BoxList />
      </div>
    );
  }
}

export default App;
