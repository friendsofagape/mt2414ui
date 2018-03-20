import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import HomePage from './components/HomePage';
import SigninForm from './components/SigninForm';
import SignupForm from './components/SignupForm';
import ForgotPassword from './components/ForgotPassword';
import NotFound from './components/NotFound';
import UploadSource from './components/UploadSource';
import CreateSource from './components/CreateSource';
import DownloadTokens from './components/DownloadTokens';
import GetTranslationDraft from './components/GetTranslationDraft';
import GetLanguages from './components/GetLanguages';
import UploadTokens from './components/UploadTokens';
import ResetPassword from './components/ResetPassword';
import SuperAdmin from './components/SuperAdmin';
import LogOut from './components/LogOut';
import Translation from './components/Translation';

let jwtDecode = require('jwt-decode');
let accessToken,
		decoded;

accessToken = JSON.parse(window.localStorage.getItem('access_token'))
if (accessToken) {
  decoded = jwtDecode(accessToken);
}

const superadmin = (
	<Switch>
		<Route exact path="/" component={HomePage}/>
		<Route  path="/sigin" component={SigninForm}/>
		<Route  path="/signup" component={SignupForm}/>
		<Route path="/superadmin" component={SuperAdmin}/>
		<Route path="/admin" component={UploadSource} />
		<Route path="/createsource" component={CreateSource}/>
		<Route path="/logout" component={LogOut}/>
		<Route path="/getlanguages" component={GetLanguages}/>
		<Route path="/downloadtokens" component={DownloadTokens}/>
		<Route path="/uploadtokens" component={UploadTokens}/>
		<Route path="/gettranslationdraft" component={GetTranslationDraft}/>
		<Route path="/resetpassword" component={ResetPassword}/>
		<Route path="/forgotpassword" component={ForgotPassword}/>
		<Route path="/translation" component={Translation}/>
		<Route  path="*" component={NotFound} />
	</Switch>
);

const admin = (
	<Switch>
		<Route path="/admin" component={UploadSource} />
		<Route path="/logout" component={LogOut}/>
		<Route path="/createsource" component={CreateSource}/>
		<Route path="/superadmin" component={HomePage}/>
		<Route path="/getlanguages" component={GetLanguages}/>
		<Route path="/downloadtokens" component={DownloadTokens}/>
		<Route path="/uploadtokens" component={UploadTokens}/>
		<Route path="/gettranslationdraft" component={GetTranslationDraft}/>
		<Route path="/signup" component={SignupForm}/>
		<Route path="/resetpassword" component={ResetPassword}/>
		<Route path="/forgotpassword" component={ForgotPassword}/>
		<Route path="/translation" component={Translation}/>
		<Route path="*" component={NotFound} />
	</Switch>
);

const member = (
	<Switch>
		<Route path="/superadmin" component={HomePage}/>
		<Route path="/admin" component={HomePage} />
		<Route path="/logout" component={LogOut}/>
		<Route path="/createsource" component={HomePage}/>
		<Route path="/getlanguages" component={GetLanguages}/>
		<Route path="/downloadtokens" component={DownloadTokens}/>
		<Route path="/uploadtokens" component={UploadTokens}/>
		<Route path="/gettranslationdraft" component={GetTranslationDraft}/>
		<Route path="/signup" component={SignupForm}/>
		<Route path="/resetpassword" component={ResetPassword}/>
		<Route path="/forgotpassword" component={ForgotPassword}/>
		<Route path="/translation" component={Translation}/>
		<Route path="*" component={NotFound} />						
	</Switch>
);

const nouser = (
	<Switch>
		<Route path="/superadmin" component={HomePage}/>
		<Route path="/admin" component={HomePage} />
		<Route path="/logout" component={LogOut}/>
		<Route path="/createsource" component={HomePage}/>
		<Route path="/getlanguages" component={HomePage}/>
		<Route path="/downloadtokens" component={HomePage}/>
		<Route path="/uploadtokens" component={HomePage}/>
		<Route path="/gettranslationdraft" component={HomePage}/>
		<Route path="/signup" component={SignupForm}/>
		<Route path="/resetpassword" component={ResetPassword}/>
		<Route path="/forgotpassword" component={ForgotPassword}/>
		<Route path="/" component={HomePage}/>
		<Route path="*" component={NotFound} />								
	</Switch>
);
const Routes = () => (
	<Router>
		<App>
			<Switch>
			{(accessToken && decoded.role === 'superadmin') ? (
				superadmin
				) : (
					(accessToken && decoded.role === 'admin') ? (
						admin
					) : (
						(accessToken && decoded.role === 'member') ? (
							member
						) : (
							nouser
						)
					)
				)
			}
			</Switch>
		</App>
	</Router>
);

export default Routes;