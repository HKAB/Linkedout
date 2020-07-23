import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from '@/home'

function App() {
  return (
    <div className="app-container">
	    <BrowserRouter>
	    <Switch>
	    	<Route path='/' component={ Home }/>
	    </Switch>
    </BrowserRouter>
    </div>
  );
}

export { App };