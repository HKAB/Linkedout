import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from '@/home'
import { Profile } from '@/profile'

function App() {
  return (
    <div className="app-container">
	    <BrowserRouter>
	    <Switch>
	    	<Route exact path='/' component={ Home }/>
	    	<Route exact path='/profile' component={ Profile }/>
	    </Switch>
    </BrowserRouter>
    </div>
  );
}

export { App };