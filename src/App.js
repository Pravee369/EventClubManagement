import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom' ;
import RootLayout from './RootLayout'; 
import Home from './home/Home';
import Register from './register/Register';
import Login from './login/Login';
import UserProfile from './userProfile/UserProfile';
import PostEvent from './postevent/PostEvent';
import Aboutus from './aboutus/Aboutus';
import Registrations from './registrations/Registrations';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'


function App() {
  const browserRouter=createBrowserRouter([
    {
      path:"/",
      element:<RootLayout />,
      children:[
        {
          path:"/",
          element:<Home />
        },
        {
          path:"/register",
          element:<Register />
        },
        {
          path:"/login",
          element:<Login />
        },
        {
          path:'/user-profile',
          element:<UserProfile/>,
        },
        {
          path:'/post-event',
          element:<PostEvent/>
        } ,
        {
          path:'/aboutus',
          element:<Aboutus/>
        } ,
        {
          path:'/registrations',
          element :<Registrations/>
        }
      ]
    }
  ])

  return (
    <div className="app">
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;
