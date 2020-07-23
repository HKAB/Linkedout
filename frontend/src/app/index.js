import React from "react";
import { Route, Switch } from "react-router-dom";

import { Login } from "@/account";

function App() {
  return (
    <div className="app-container">
      <Switch>
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export { App };
