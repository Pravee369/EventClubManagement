import React, { useContext } from 'react'
import { loginContext } from '../contexts/loginContext';

function Registrations(){

    let [currentUser, error, userLoginStatus, registeredEvents , loginUser, logoutUser] =
    useContext(loginContext);

    let eventsTableData={};

    registeredEvents.forEach(registration => 
    {
        const {eventtitle,username} = registration;
        if(!eventsTableData[eventtitle])   
        {
            eventsTableData[eventtitle]=[];
        }
        eventsTableData[eventtitle].push(username)
    });

   console.log("In Registrations.js events:",eventsTableData);


  return (
    <div className="mt-5 p-3 center">
       {Object.entries(eventsTableData).map(([key,values])=>
       {
        return(

        <table className="table" key={key}>
        <thead>
            <tr>
                <th>{key}</th>
            </tr>
        </thead>
        <tbody>
            {values.map((username, index) => ( //braces should be normal ones not flower
                <tr key={index}>
                    <td>{username}</td>
                </tr>
            ))}
        </tbody>
       </table>
        )
       })}

    </div>
  )
}

export default Registrations