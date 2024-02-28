import React ,{useEffect, useState} from 'react';
import { loginContext } from './loginContext';
import axios from 'axios'


function UserLoginContextStore({children}) 
{
    let [currentUser,setCurrentUser]=useState({});
    let [error,setError]=useState("");
    let [userLoginStatus,setUserLoginStatus]=useState(false)
    let [registeredEvents, setRegisteredEvents] = useState([]); // Initialize data state with an empty array
    let [err, setErr] = useState(null); // Initialize err state with null

    //userlogin
    const loginUser=(userCredObj)=>{
        axios.post('http://localhost:3000/user-api/login-user',userCredObj)
        .then(response=>{
            if(response.data.message==="success"){
                //update current User state
                setCurrentUser({...response.data.user})
                //update user login status
                setUserLoginStatus(true)
                console.log(userLoginStatus)
                //update error status
                setError("")
                //store jwt token in local or session storage
                localStorage.setItem("token",response.data.token)
                
            }else{
                setError(response.data.message)
            }
        })
        .catch(err=>{
                console.log(err.message)      
        })
    }

    
    //userlogout
    const logoutUser=()=>{
        //clear local or session storage
        localStorage.clear();
         //update user login status
         setUserLoginStatus(false)
        // navigate('/login')

    }


   
        axios.get("http://localhost:3000/register/get-registered-events")
           .then((response) => {
              console.log("all registered events ",response.data.payload); // Log the entire response
              setRegisteredEvents(response.data.payload);
              console.log("registeredEv ents",registeredEvents) // Update the data state with response.data
           })
           .catch((error) => { // Corrected catch block syntax
              console.error("Error fetching data:", error); // Log the error
              setErr(error); // Update the err state with the error object
           });
 // Empty dependency array means this effect runs only once after the component mounts(component inserted into DOM)


     useEffect(() => {
        setRegisteredEvents(registeredEvents);
     },[])

  return (
   <loginContext.Provider value={[currentUser,error,userLoginStatus,registeredEvents,loginUser,logoutUser]}>
        {children}
   </loginContext.Provider>
  )
}

export default UserLoginContextStore 