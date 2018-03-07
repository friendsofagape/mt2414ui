import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import HomePage from './HomePage';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import ForgotPassword from './ForgotPassword';
import NotFound from './NotFound';
import UploadSource from './UploadSource';
import CreateSource from './CreateSource';
import DownloadTokens from './DownloadTokens';
import GetTranslationDraft from './GetTranslationDraft';
import GetLanguages from './GetLanguages';
import UploadTokens from './UploadTokens';
import ResetPassword from './ResetPassword';
import SuperAdmin from './SuperAdmin';
import LogOut from './LogOut';
import Translation from './Translation';

let jwtDecode = require('jwt-decode');
let accessToken,
	decoded;

accessToken = JSON.parse(window.localStorage.getItem('access_token'))
if (accessToken) {
  decoded = jwtDecode(accessToken);
}

render((
	<Router>
		<App>
			<Switch>
			{(accessToken && decoded.role === 'superadmin') ? (
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
				) : (
					(accessToken && decoded.role === 'admin') ? (
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
					) : (
						(accessToken && decoded.role === 'member') ? (
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
						) : (
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
						)
					)
				)
			}
			</Switch>
		</App>
	</Router>
), document.getElementById('app'));