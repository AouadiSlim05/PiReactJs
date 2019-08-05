import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import ReactDOM from 'react-dom';

import Dashboard from './components/DashboardComponent/dashboardComponent';
import Statistics from './components/DashboardComponent/statisticsComponent';
import Post from './components/post';
import PostForm from './components/postForm';
import { Provider } from 'react-redux';
import store from './store/index';
class App extends Component {
  render() {
    
    return (
         <Router>
            <Route exact path='/' component={Dashboard} />
            <Route path='/statistics' component={Statistics} />

      </Router>
    /*  <Provider store={store}>

      <div>
      <PostForm/>
      <hr/>
      <Post/>
      </div>
      </Provider>*/
    );
  }
}

export default App;
