import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './Router.js';
import Hello from './Hello.js';
import NotFound from './NotFound.js';

const routes = [
  {
    path: '/hello',
    component: Hello,
    props: { name: 'world' },
    propFromPath: { id: 0 }  // value is used as default value if path doesn't contain one
  }
]

const defaultRoute = {
  component: NotFound
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Router routes={routes} defaultRoute={defaultRoute} />
      </div>
    );
  }
}

export default App;
