import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from '@/home'
import { Profile } from '@/profile'
import { Login } from '@/account'
import { CreateProfile } from '@/account';

function App() {
	return (
		<div className="app-container">
			<BrowserRouter>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/profile' component={Profile} />
					<Route exact path='/create-profile' component={CreateProfile} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export { App };
