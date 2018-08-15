import React, { Component } from 'react';
import Login from '../components/Login';
import {library} from "@fortawesome/fontawesome-svg-core/index";
import {faStroopwafel} from "@fortawesome/free-solid-svg-icons/index";

class App extends Component {
  render() {
      library.add(faStroopwafel);
    return (
      <div>
        <Login/>
      </div>
    );
  }
}

export default App;
