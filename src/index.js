import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import App from './App';


 
ReactDOM.render(
  <BrowserRouter   >
    <Switch>
      <Route path="/" render={ (props) =>   <App {...props} /> } />
      <Redirect to="/tableData" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

