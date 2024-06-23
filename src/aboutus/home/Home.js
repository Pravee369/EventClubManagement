import React, { useContext, useEffect, useState } from 'react';
import { loginContext } from '../contexts/loginContext';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/Footer.js';
import axios from "axios";
import './Home.css'

function Home() {
   const [err, setErr] = useState(null); // Initialize err state with null
   const [data, setData] = useState([]); // Initialize data state with an empty array
   const [regisErr,setRegisErr] = useState("")
   const navigate = useNavigate()

   let [currentUser, error, userLoginStatus, registeredEvents , loginUser, logoutUser] =
    useContext(loginContext);

   useEffect(() => {

      //req to get all events 
      axios.get("http://localhost:3000/event-api/get-allevents")
         .then((response) => {
            setData(response.data.message);
         })
         .catch((error) => { 
            console.error("Error fetching data:", error); 
            setErr(error); 
         });
   }, []); 


   let token=localStorage.getItem("token")

   const registerEvent=(item)=>
   {
      item["username"] = currentUser.username; 
      if(userLoginStatus===false)
      {
         navigate("/register")
      }
      else
      {
         axios.post("http://localhost:3000/register/register-event",item,{headers:{"Authorization":"Bearer "+ token}})
        .then((response)=>
        {
           if(response.status===201)
           {
             navigate("/user-profile")
           }
        })
        .catch(err)
        {
         setRegisErr(err.message)
        }
      }
      
   }


  
  return (
   <div className="fluid-container w-100 home">
     
      <h1 className=" welcome display-1 text-dark text-center"> Welcome to <span className=" takepart rubik-moonrocks-regular"> Take Part </span> </h1>


      {/* Use map to render each item in the data array */}
      {data.map((item, index) => (
       <div key={index} className="card col col-md-5 mt-5 mx-auto p-2">
        <h1 className="card-header text-center text-success">{item.eventtitle}</h1>
        <p className="card-body text-center lead">{item.desc}</p>
        <p className="text-dark lead">{item.vt}</p>
        {registeredEvents.some(event => userLoginStatus && event.username === currentUser.username && event.eventtitle === item.eventtitle) ? (
            <button className="btn text-success border-success">Already Registered</button>
        ) : (
            <button className="btn btn-success" onClick={() => registerEvent(item)}>Register</button>
        )}
      </div>
   ))} 

      {/* Conditional rendering for error */}
      {err && <p>Error: {err.message}</p>}

      <Footer/>
   </div>
  );
}

export default Home;
