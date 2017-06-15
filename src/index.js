import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import SignupForm from './SignupForm';
import SigninForm from './SigninForm';
import UploadSource from './UploadSource';
import DownloadTokens from './DownloadTokens';
import GetConcordances from './GetConcordances';
import GenerateConcordance from './GenerateConcordance';
import GetTranslationDraft from './GetTranslationDraft';
import GetLanguages from './GetLanguages';
import UploadTokens from './UploadTokens';

const store = createStore(
      (state = {}) => state,
      applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <Router path="/" history={browserHistory}>
      <Route path="/signup" component={SignupForm} />
      <Route path="/" component={SigninForm} />
      <Route path="/signin" component={SigninForm} />
      <Route path="/getlanguages" component={GetLanguages}/>
      <Route path="/uploadsource" component={UploadSource} />
      <Route path="/downloadtokens" component={DownloadTokens}/>
      <Route path="/uploadtokens" component={UploadTokens}/>
      <Route path="/getconcordances" component={GetConcordances}/>
      <Route path="/generateconcordance" component={GenerateConcordance}/>
      <Route path="/gettranslationdraft" component={GetTranslationDraft}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
