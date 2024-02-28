import React, { useContext, useEffect, useState } from "react";
import { loginContext } from "../contexts/loginContext";
import axios from "axios";

function UserProfile() {
  let [currentUser, error, userLoginStatus, registeredEvents,loginUser, logoutUser] =
    useContext(loginContext);
  let [err, setErr] = useState("");
  let [updatedRegisteredEvents, setUpdatedRegisteredEvents] = useState(registeredEvents);


  console.log("userprofile registered events",updatedRegisteredEvents)


    //get token from local storage
  let token=localStorage.getItem("token")


  const unRegisterEvent = (item) => {
    console.log("item to be deleted", item);
    axios.delete('http://localhost:3000/register/delete-event', {
      data: item, // Pass item as data in the config object
      headers: {
        "Authorization": "Bearer " + token
      }
    })
    .then(res => {
      if (res.status === 204) {
        // No content in response, you might not get res.data
        console.log("Event successfully unregistered");
        // Update the registered events in state
        setUpdatedRegisteredEvents(prevEvents => prevEvents.filter(event => event._id !== item._id));
      }
    })
    .catch(err => {
      console.log(err.message);
    });
  }
  

  useEffect(()=>
        {
          setUpdatedRegisteredEvents(registeredEvents);
        }
        ,[registeredEvents])
  

  return (
    <div className="mt-5 p-3">
      <h4 className="text-end text-primary">
        Welcome, {currentUser.username}
      </h4>
      <img src={currentUser.image} width="80px" height="75px" className="float-end d-block" alt="Your profile photo is unavailable" />

      {/* add products and cart links here */}

      {updatedRegisteredEvents?.filter((item,index)=> item.username===currentUser.username).length===0?<h1 className="text-center ">You have not registered for any events </h1> :<h1 className="text-center ">Your Registered Events</h1>}
       
       {updatedRegisteredEvents?.map((item,index)=>
       (
         
          (item.username===currentUser.username) &&
          <div key={index} className="card col col-md-5 mt-5 mx-auto p-1">
          <h1 className="card-header text-center text-success">{item.eventtitle}</h1>
          <p className="card-body text-center lead">{item.desc}</p>
          <p className=" text-dark lead">{item.vt}</p>
          <button className="btn btn-danger" onClick={()=>unRegisterEvent(item)}>UnRegister</button>
          </div>
           

       ))}
     </div>
  );
}

export default UserProfile;
