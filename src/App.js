import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './router/Router.js';
import Hello from './Hello.js';
import NotFound from './NotFound.js';
import Link from './router/Link';

const abbreviate = str => {
  return str.charAt(0) + '.';
}

const capitalize = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const limitLength = str => {
  return str.slice(0, 20);
}

const userIsLoggedIn = () => true;

const routes = [{
  path: '/hello/:first/:last',
  component: Hello,
  guards: [userIsLoggedIn],
  propsFromPath: [{
      prop: 'first',
      segment: ':first',
      plugs: [limitLength, abbreviate, capitalize]
    }, {
      prop: 'last',
      segment: ':last',
      plugs: [limitLength, capitalize]
    }]
}]

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

        <Link path={'/hello/foo/bar'}>
          <button>Click me!</button>
        </Link>

      </div>
    );
  }
}

export default App;
