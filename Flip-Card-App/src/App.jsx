import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import sventhai from './components/sventhai';
import svenjapan from './components/svenjapan';
import Navbar from './components/CustomNavbar';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/sventhai" component={sventhai} />
          <Route path="/svenjapan" component={svenjapan} />
        </div>
      </Router>
    );
  }
}

export default App;
