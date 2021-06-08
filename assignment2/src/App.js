import "./App.css";
import Register from "./register";
import Login from "./login";
import Homepage from "./homepage";
import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <div id="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Register}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/homepage" component={Homepage}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
