import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import Header from './containers/Header';
import Profile from './containers/Profile';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Route path="/profile" component={Profile}/>
      </div>
    );
  }
}

export default App;
