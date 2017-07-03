import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import SignupForm from './SignupForm';
import UploadSource from './UploadSource';
import DownloadTokens from './DownloadTokens';
import GetConcordances from './GetConcordances';
import GenerateConcordance from './GenerateConcordance';
import GetTranslationDraft from './GetTranslationDraft';
import GetLanguages from './GetLanguages';
import UploadTokens from './UploadTokens';
import HomePage from './HomePage';
import ResetPassword from './ResetPassword';
import ForgotPassword from './ForgotPassword';

const store = createStore(
      (state = {}) => state,
      applyMiddleware(thunk)
);

let accessToken = JSON.parse(window.localStorage.getItem('access_token'))

ReactDOM.render(
  <Provider path="/" store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={HomePage} />
      <Route path="/homepage" component={HomePage} />
       { (accessToken) ? (
        <Router history={browserHistory}>
            <Route path="/getlanguages" component={GetLanguages}/>
            <Route path="/uploadsource" component={UploadSource} />
            <Route path="/downloadtokens" component={DownloadTokens}/>
            <Route path="/uploadtokens" component={UploadTokens}/>
            <Route path="/getconcordances" component={GetConcordances}/>
            <Route path="/generateconcordance" component={GenerateConcordance}/>
            <Route path="/gettranslationdraft" component={GetTranslationDraft}/>
            <Route path="/signup" component={SignupForm}/>
            <Route path="/resetpassword" component={ResetPassword}/>
            <Route path="/forgotpassword" component={ForgotPassword}/>
        </Router>
          ) : (
           <Router history={browserHistory}>
            <Route path="/getlanguages" component={HomePage}/>
            <Route path="/uploadsource" component={HomePage} />
            <Route path="/downloadtokens" component={HomePage}/>
            <Route path="/uploadtokens" component={HomePage}/>
            <Route path="/getconcordances" component={HomePage}/>
            <Route path="/generateconcordance" component={HomePage}/>
            <Route path="/gettranslationdraft" component={HomePage}/>
            <Route path="/signup" component={SignupForm}/>
            <Route path="/resetpassword" component={ResetPassword}/>
            <Route path="/forgotpassword" component={ForgotPassword}/>
           </Router>
          )
        }
    </Router>
  </Provider>,
  document.getElementById('root')
);
