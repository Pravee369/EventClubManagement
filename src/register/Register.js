import React from 'react'
import { useState} from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import './Register.css'
import axios from "axios"

function Register() {
 
let [error,setError] =useState("");
let [selectedFile,setSelectedFile]=useState(null);
let { register,handleSubmit,formState: { errors }, }=useForm();   


const navigate=useNavigate();

let addNewUser =(newUser)=>
{
  console.log(newUser);
  let fd=new FormData();
  //console.log(fd.user)
  fd.append("user",JSON.stringify(newUser))
  console.log(fd)
  fd.append("photo",selectedFile);
  //console.log(fd.user);
  axios.post("http://localhost:3000/user-api/register-user",fd)
  .then((response)=>
  {
    if(response.status===201)
    {
      console.log("navigated to login page");
      navigate ("/login");
    }
    if(response.status!==201)
    {
     setError(response.data.message);
    }
  })
  .catch((err) => {
    console.log("err in user signup",err)
    //the client was given an error response (5xx,4xx)
    if (err.response) {
      setError(err.message);
    }
    //the client never received a response
    else if (err.request) {
      setError(err.message);
    }
    //for other error
    else {
      setError(err.message);
    }
  });
}

const onFileSelect=(e)=>
  {
     setSelectedFile(e.target.files[0])
  }

 return (

<div className="container mt-1 row">

      <h1 className="display-5 text-dark pt-5">Users should SignUp and then Login to Register for the Events</h1>
      {/* form submission error */}

      {error!=undefined && error.length !== 0 && ( //changed here
        //console.log(error)
        <p className="display-3 text-danger text-center">{error}</p>
      )}
   <div  className="col-11 col-sm-8 col-md-6 mx-auto" >
    <form className="border border-dark form mt-1 p-1" onSubmit={handleSubmit(addNewUser)}>
      
      <div> 
        <label htmlFor="name" className="form-label form-control-label text-white">Username</label>
        <input type="text" id="username" className="form-control mt-1 border  border-dark" placeholder="e.g John" {...register('username')} required />
      </div>

      <div> 
        <label htmlFor="email" className="form-label form-control-label text-white">Email</label>
        <input type="email" id="email" className="form-control mt-1 border-dark" {...register('email')} required></input>
      </div>

      <div className="mx-auto"> 
        <label htmlFor="password" className="form-label form-control-label text-white">Password</label>
        <input type="password" id="password" className="form-control mt-1 border-dark" {...register('password')} required></input>
      </div>

      <div className="mx-auto"> 
        <label htmlFor="image"  className="form-label form-control-label text-white"> Profile </label>
        <input type="file" id="image" className="form-control mt-1 border-dark" onInput={onFileSelect} {...register('photo')} required />
      </div> 

      <div className="mx-auto">
        <label htmlFor="userType" className="form-label form-control-label text-white">Choose UserType</label>
        <select name="userType" id="userType" className="form-control mt-1 border-dark" {...register("userType")}>
        <option value="normalUser"> Normal User </option>
        <option value="admin"> Admin </option>
       </select>
      </div>
      
      <div className="mx-auto">
      <button type="submit" className="btn bg-danger mt-3 rounded text-white p-1 border border-danger" >Register</button>
      </div>
    </form>
  </div>
</div>
  )
}

export default Register