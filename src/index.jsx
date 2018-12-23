import React,  { Fragment } from 'react';
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import UserAppContainer from './UserAppContainer';
import ResearcherAppContainer from './ResearcherAppContainer';
import {Router, Route,  } from 'react-router';
import { createBrowserHistory } from 'history';
import ReactDOM from 'react-dom';
import store from 'store';

ReactDOM.render(
  <Provider store={store}>
      <Router history={createBrowserHistory()}>
  <Fragment>  
        <Route exact path="/" component={UserAppContainer} />
        <Route path="/User" component={UserAppContainer} />
        <Route path="/Researcher" component={ResearcherAppContainer} />
    </Fragment>
    </Router>
  </Provider>,
  document.getElementById('body')
);