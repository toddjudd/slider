import React from 'react';
import SideBar from './SideBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './SideBarNav.less';

const SideBarNav = () => {
  return (
    <div className='App'>
      <Router>
        <SideBar></SideBar>
        {/* top bar */}
        <div className='content'>
          {/*
          my thoughs are that here content could bisect
          it could show a permanent header,
          and the body chould change on the route.
        */}
          <Route path='/' exact></Route>
          <Route path='/pick'></Route>
          <Route path='/assign'></Route>
          <Route path='/settings'></Route>
        </div>
      </Router>
    </div>
  );
};

export default SideBarNav;
