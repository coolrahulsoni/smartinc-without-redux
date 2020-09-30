import React from 'react';
import {  Route, Switch, Redirect } from "react-router-dom";
import './css/bootstrap/bootstrap.scss';
import Header from './component/header';
import Footer from './component/footer';
import Loadable from 'react-loadable';

const TableData = Loadable({
	loader: () => import('./component/table_data'),
	loading() {
		return (<div class="row tablebRow justify-content-center"> <span>Loading... </span></div>)
	}
})

const Blank = Loadable({
	loader: () => import('./component/blank'),
	loading() {
		return (<div class="row tablebRow justify-content-center"> <span>Loading... </span></div>)
	}
})


const App=()=> { 
  return (
    <div className="App">     
      <div className="main-content">
      <Header/>      
      <div>
      <Switch>          
                <Route
                exact
                  path='/tableData'
                  component={TableData}                
                />
                          
                <Route
                 exact
                  path='/Blank'
                  component={Blank}                
                />                         
           
            <Redirect from="/" to="/tableData" />
          </Switch>
      </div>
      <Footer/>
      </div>
    </div>
  );
}

export default React.memo(App)