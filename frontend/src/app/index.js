import { CreateProfile, Login } from 'account';
import { Feed } from 'feed';
import { Home } from 'home';
import { Profile } from 'profile';
import { ViewProfile } from 'profile/ViewProfile';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/profile/company/:id' render={(props) => (<ViewProfile {...props} accountType="company" />)} />
          <Route exact path='/profile/student/:id' render={(props) => (<ViewProfile {...props} accountType="student" />)} />
          <Route exact path='/create-profile' component={CreateProfile} />
          <Route exact path='/feed' component={Feed} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export { App };
