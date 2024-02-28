import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from './navbar/Navbar.js'
import './RootLayout'

function  RootLayout() {
  return (
    <div>
      <div className="main">
         <div className="container-fluid m-0 ">
            <Navbar />
         </div>
         <div className="constainer-fluid " >
            <Outlet />
          </div>
      </div>
    </div>
  );
}

export default RootLayout;