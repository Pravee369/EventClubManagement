import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <div className="container-fluid mt-1">
      <footer  className="footer bg-dark p-2">
          <p className="text-center text-white lead">Contact us:</p>
          <ul className="list-unstyled">
            <li className="text-white text-center"> <a href="#" className="text-white">praveenasangireddy441@gmail.com </a> </li>
            <li className="text-white text-center"> <a href="#" className="text-white"> +91 9391307424 </a> </li>
          </ul>

          <p className="text-white text-center" >Follow us on</p>
          <div className="logos">
            <a href="#">
             <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAE84mp8sp1CmjSGV-2hFWcg9p8Srk39Sn1Q&usqp=CAU" width="30px" height="30px" className="p-1"/>
            </a>
            <a href="#">
             <img  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQhzdqxVJOC4XDYG9DiFgtXqXaW_ouRoUOjQ&usqp=CAU" width="30px" height="30px"  className="p-1"/>
            </a>
            <a>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJbFDsa_yUse2NB83gGQ2h3MzjghQJVrUHwg&usqp=CAU" width="30px" height="30px" />
            </a>
          </div>
      </footer>
    </div>
  )
}

export default Footer