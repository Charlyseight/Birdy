import React from 'react';
import { Link } from "react-router-dom";
import logoBird from "../Images/origami-bird.png";

const NavLogo = () => {
    return ( 
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <img src={logoBird} alt=""/> 
            </Link>
          </div>
        </nav>
      </div>
     );
}
 
export default NavLogo;