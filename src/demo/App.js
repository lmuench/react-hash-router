import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Hello from './Hello.js';
import NotFound from './NotFound.js';
import { LightRouter, LightLink } from '../lib';

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
  effects: [() => console.log('GET /hello/:first/:last')],
  propsFromPath: [{
      prop: 'first',
      segment: ':first',
      plugs: [limitLength, abbreviate, capitalize],
      effects: [segment => console.log(`:first = ${segment}`)]
    }, {
      prop: 'last',
      segment: ':last',
      plugs: [limitLength, capitalize],
      effects: [segment => console.log(`:last = ${segment}`)]
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
          <h1 className="App-title">React Light Router</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <LightRouter routes={routes} defaultRoute={defaultRoute} style={{ padding: '16px' }} />

        <LightLink path={'/hello/foo/bar'} style={{ padding: '4px' }}>
          <button>I am Foo Bar</button>
        </LightLink>

        <LightLink path={'/hello/bar/foo'} style={{ padding: '4px' }}>
          <button>I am Bar Foo</button>
        </LightLink>
        
      </div>
    );
  }
}

export default App;
