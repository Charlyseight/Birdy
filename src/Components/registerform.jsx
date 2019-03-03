import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import firebase from "firebase";
import {Link} from "react-router-dom";

class RegisterForm extends Form {
  state = {
    data: { lastname: "", name: "", id: "", password: "", email: "" },
    errors: {}
  };
  schema = {
    lastname: Joi.string()
      .required()
      .label("Nom de famille"),
    name: Joi.string()
      .required()
      .label("Nom"),
    id: Joi.string()
      .required()
      .label("ID"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Mot de passe"),
    email: Joi.string()
      .required()
      .email()
      .label("Email")
  };

  doSubmit = e => {
    const { email, password } = this.state.data;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        this.createUser(user);
      })
      .catch(error => {
        console.error(error);
      });
  };

  createUser(newUser) {
    const { lastname, name, id } = this.state.data;
    const { email, uid } = newUser.user;
    firebase
      .database()
      .ref("Utilisateurs/" + uid)
      .set({
        lastname,
        name,
        id,
        email,
        userId: uid
      })
  }

  render() {
    return (
      <div className="container mb-5" style={{ marginTop: 8 + "em" }}>
      <p style={{marginTop: "2em", marginBottom: ".3em"}}>Vous possédez déja un compte ? Connectez-vous !</p>
        <Link to="/">
        Se connecter
        </Link>
        <h1 style={{marginTop: "1em", marginBottom: ".5em"}}>S'enregistrer</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("lastname", "Nom de famille")}
          {this.renderInput("name", "Prénom")}
          {this.renderInput("id", "ID (Fourni par l'institut des Sciences Naturelles)")}
          {this.renderInput("password", "Mot de passe", "password")}
          {this.renderInput("email", "Votre email")}
          {this.renderButton("S'enregistrer")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
