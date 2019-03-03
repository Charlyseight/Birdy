import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import firebase from "firebase";
import { NavLink } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
    fautes: {
      message: ""
    }
  };
  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password")
  };

  doSubmit = () => {
    const { email, password } = this.state.data;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(u => {})
      .catch(error => {
        const fautes = {...this.state.fautes};
        if(error.message){
          fautes.message = error.message;
        }else{
          fautes.message = "";
        }
        console.log(fautes);
        this.setState({fautes});
      });
  };

  noUser = () => {
    if(this.state.fautes.message) {
      return(
      <p className="alert alert-danger">
        {this.state.fautes.message}
      </p>
      )
    }
    
  }

  render() {
    return (
      <div className="container mb-5" style={{ marginTop: 8 + "em" }}>
        <p style={{
          width:"300px",
          margin: "0 auto 1em", 
          fontSize: "4em", 
          color: "rgb(170,240,209)", 
          textTransform: "uppercase", 
          letterSpacing: "1.8px", 
          fontWeight: "300",
          borderBottom: "1px solid rgb(222,222,222)",
          padding: "0em 1em"}}>
            Birdy
          </p>
        <h1>Se connecter</h1>
        <React.Fragment>
          {this.noUser()}
        </React.Fragment>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Votre email")}
          {this.renderInput("password", "Mot de passe", "password")}
          {this.renderButton("Se connecter")}
        </form>
        <p style={{marginTop: "2em", marginBottom: ".3em"}}>Pas encore de compte ? Vous pouvez vous en créer un !</p>
        <NavLink to="/register">
            Se créer un compte
        </NavLink>
      </div>
    );
  }
}

export default LoginForm;
