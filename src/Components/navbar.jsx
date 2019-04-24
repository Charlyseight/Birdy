import React, { Component } from "react";
import firebase from "firebase";
import { NavLink, Link } from "react-router-dom";
import logoBird from "../Images/origami-bird.png";

class NavBar extends Component {
  logOut() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <Link className="navbar-brand" to="/" style={{display:"flex", alignItems:"center", marginRight:"auto"}} >
              <img src={logoBird} alt="" />
            </Link>
            <button
              className="navbar-toggler toggler-example"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto" role="tablist">
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/">
                    Faire une capture
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/captures">
                    Mes captures
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/map">
                    Carte
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/allbirds">
                    Encyclopédie
                  </NavLink>
                </li>
                <li>
                  <NavLink className="nav-link" to="/users">
                    Utilisateurs
                  </NavLink>
                </li>
                <li>
                  <Link className="nav-link" to="/" onClick={this.logOut}>
                    Se déconnecter
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
export default NavBar;
