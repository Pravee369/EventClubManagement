import React, { useContext, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loginContext } from '../contexts/loginContext';
import './PostEvent.css'

function PostEvent()
{
  let [currentUser, error, userLoginStatus,registeredEvents ,loginUser, logoutUser] =
  useContext(loginContext);
  let {register, handleSubmit, formState: { errors }, } = useForm();
  const navigate= useNavigate() 
  let [err,setErr]=useState("")
    
     //get token from local storage
  let token=localStorage.getItem("token")


  const postEvent=(newEvent)=>
    {
       axios.post("http://localhost:3000/event-api/postevent",newEvent,{headers:{"Authorization":"Bearer "+token}})
       .then((response)=>
       {
         if(response.status==201)
         {
            navigate("/")
         }
        
          setErr(response.message)
         
       })
       .catch=(err)=>
       {
           console.log(err.message)
           setErr(err.message)
       }
    }
    


  return (
    <div className="container mt-1 row">

      <h1 className="display-5 text-dark pt-5 text-center">Admins can post event details here</h1>

      {/* form submission error */}

      {err!=undefined && err.length!==0 && (<p className="lead">{err}</p>)}

      {error!=undefined && error.length !== 0 && ( //changed here
        //console.log(error)
        <p className="display-3 text-danger text-center">{error}</p>
      )}

      <div className="col-11 col-sm-8 col-md-6 mx-auto" >
      <form className="border border-dark form mt-1 p-1" onSubmit={handleSubmit(postEvent)}>
      <div> 
        <label htmlFor="eventtitle" className="form-label form-control-label text-white">Event Title</label>
        <input type="text" id="eventtitle" className="form-control  border-dark " placeholder="e.g Presentation" {...register('eventtitle')} required />
      </div>

      <div> 
        <label htmlFor="desc" className="form-label form-control-label text-white">Event Description</label>
        <textarea type="text" id="desc" className="form-control  border-dark " col="30" {...register('desc')} required></textarea>
      </div>

      <div> 
        <label htmlFor="vt" className="form-label form-control-label text-white"> Venue and Time</label>
        <textarea type="text" id="vt" className="form-control border-dark " cols="5" {...register('vt')} required></textarea>
      </div>
     
      <div>
      <button type="submit" className="btn btn-danger mt-3 rounded text-white p-1 border border-danger" >Post </button>
      </div>

      </form>

      </div>
    </div>
  )
}

export default PostEvent;