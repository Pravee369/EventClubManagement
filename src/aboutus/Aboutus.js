import React from 'react'
import './Aboutus.css'
import MyPhtoForEvent from './images/MyPhtoForEvent.jpg'
import Ramana from './images/Ramana.jpg'
import Naveena from './images/Naveena.jpg'

function Aboutus() {
  return (
    <div className="container mt-5">
        <p className="lead">At JNTUH, we are dedicated to fostering intellectual growth, creativity, and camaraderie among our fellow students. As a vibrant hub of academic and cultural exchange, we strive to create opportunities for learning, expression, and personal development.</p>
        <h2>Our Mission</h2>
        <p className='lead'>Our mission is to provide a platform for students to engage in a variety of academic and extracurricular activities, including essays, presentations, debates, and more. Through our events and initiatives, we aim to cultivate critical thinking, communication skills, and a passion for learning beyond the classroom.</p>
        <h3>Meet Our Team</h3>
        <p className="lead">Our team consists of passionate students who are committed to organizing and facilitating enriching experiences for our members. Get to know the individuals behind the scenes who make it all happen:</p>
       <div className="row row-cols-md-3">

          <div className="card m-1 aboutusCard">
        
            <div className="card-body">
              <img src={Naveena} alt="img unavailable"  />
            </div>
            <div className="card-footer ">
              <h4 className="text-center">S.Naveena</h4>
            </div>

          </div>

        
         <div className="card m-1 aboutusCard">
         
          <div className="card-body">
           <img src={Ramana} alt="img unavailable" />
          </div>
          <div className="card-footer">
             <h4 className="text-center">Dravid</h4>
          </div>

        </div>

        <div className="card m-1 aboutusCard">
        
          <div className="card-body">
           <img src={MyPhtoForEvent} alt="img unavailable" />
          </div>
          <div className="card-footer">
             <h4 className="text-center">S.Praveena</h4>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Aboutus