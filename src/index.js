import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import SignupForm from './SignupForm';
import SigninForm from './SigninForm';
import SourceDocument from './SourceDocument';

const store = createStore(
      (state = {}) => state,
      applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <Router path="/" history={browserHistory}>
      <Route path="/app" component={App} />
      <Route path="/signup" component={SignupForm} />
      <Route path="/signin" component={SigninForm} />
      <Route path="/sourcedocument" component={SourceDocument} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
