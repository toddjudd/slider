import React from 'react';
import SideBar from './SideBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.less';

const App = () => (
  <div className='App'>
    <Router>
      <SideBar></SideBar>
      <div className='content'>
        {/*
          my thoughs are that here content could bisect
          it could show a permanent header,
          and the body chould change on the route.
        */}
        <Route path='/' exact>
          <div>/</div>
        </Route>
        <Route path='/pick'>
          <div>pick</div>
        </Route>
        <Route path='/assign'>
          <div>assign</div>
        </Route>
        <Route path='/settings'>
          <div>settings</div>
        </Route>
      </div>
    </Router>
  </div>
);

export default App;
