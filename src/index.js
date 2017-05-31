import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import SignupForm from './SignupForm';
import SigninForm from './SigninForm';
import UploadSource from './UploadSource';
import GenerateTokens from './GenerateTokens';
import GetConcordances from './GetConcordances';
import GenerateConcordance from './GenerateConcordance';
import GetTranslationDraft from './GetTranslationDraft';
import GetLanguages from './GetLanguages';


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
      <Route path="/getlanguages" component={GetLanguages}/>
      <Route path="/uploadsource" component={UploadSource} />
      <Route path="/generatetokens" component={GenerateTokens}/>
      <Route path="/getconcordances" component={GetConcordances}/>
      <Route path="/generateconcordance" component={GenerateConcordance}/>
      <Route path="/gettranslationdraft" component={GetTranslationDraft}/>

    </Router>
  </Provider>,
  document.getElementById('root')
);
