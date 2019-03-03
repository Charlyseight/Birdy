import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import Form from "./common/form";
import Joi from "joi-browser";
import Input from "./common/input";

class NoRepriseForm extends Form {
  state = {
    capture_session: {
      started: false,
      location: {
        lat: '',
        lng: ''
      },
      method: '',
      uid: firebase.auth().currentUser.uid
    },
    data: {
      name: "",
      session_id:"",
      uid: firebase.auth().currentUser.uid,
      reprise: false,
      numberBadge: "",
      latinName: "",
      wingsLenght: "",
      weight: "",
      adiposity: "",
      sex: "",
      age: "",
    },
    errors: {}
  };
  schema = {
    name: Joi.string()
    .required()
    .label("Nom de l'oiseau"),
    reprise:Joi.boolean()
    .required()
    .label("S'agit t'il d'une reprise ?"),
    numberBadge: Joi.number()
      .required()
      .label("Quel numéro de bague ?"),
    latinName: Joi.string()
      .required()
      .label("Quel est son nom latin ?"),
    wingsLenght: Joi.number()
      .required()
      .label("Quelle est la longueur alaire de l’oiseau ?"),
    weight: Joi.number()
      .required()
      .label("Poids"),
    adiposity: Joi.number()
      .required()
      .label("Adiposité (niveau de graisse)"),
    sex: Joi.string()
      .required()
      .label("Sexe"),
    age: Joi.number()
      .required()
      .label("Âge"),
    session_id: Joi.string(),
    uid: Joi.string(),
  };

  componentDidMount() {
    const capturer = firebase.database().ref('single_captures');

    capturer.on('value', snap => {
        this.setState({
            single_captures: snap.val()
        })
    })
    this.setPosition();
  }

  handleStartCaptureSession = e => {
    e.preventDefault();
    const {location, method, uid} = this.state.capture_session;
    const captureTime = Date.now();
    const session = firebase.database().ref('capture_sessions/' + captureTime);
    session.set({
      location, method, uid
    })
    session.once('value').then(snapshot => {
      const data = {...this.state.data};
      const capture_session = {...this.state.capture_session};
      data.session_id = snapshot.key;
      capture_session.started = true;
      this.setState({capture_session});
      this.setState({data});
    })
  };

  setPosition = () => {
    //store in const the capture_session state
    const capture_session = {...this.state.capture_session};

    // Get the current position
    navigator.geolocation.getCurrentPosition(position => {
      // Add the current location to the session lat and lng
      capture_session.location.lat = position.coords.latitude
      capture_session.location.lng = position.coords.longitude

      // Set the modified state to the capture_session
      this.setState({capture_session})
    })
  };


  handleCaptureSession = ({currentTarget: input}) => {
    const capture_session = {...this.state.capture_session};
    capture_session[input.name] = input.value;
    this.setState({capture_session});
  }

  handleReprise = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data });
  };
  doSubmit = () => {
    const {age, adiposity, sex, latinName, reprise, uid, name,  numberBadge, session_id, weight, wingsLenght} = this.state.data;
    const capturer = firebase.database().ref('single_captures');
    capturer.push({
      age, adiposity, sex, latinName, reprise, uid, name, numberBadge, session_id, weight, wingsLenght
    }).then(() => {
      const data = {...this.state.data};
      data.name = ""
      data.age = ""
      data.adiposity = ""
      data.sex = ""
      data.latinName = ""
      data.reprise =  false
      data.numberBadge = ""
      data.weight = ""
      data.wingsLenght = ""
      this.setState({data})
    }
    )
  };
  session() {
    const {started, method} = this.state.capture_session;
    if(started !== true){
      return (
          <div className="container" style={{ marginTop: 8 + "em" }}>
            <h1>
              Commencer une nouvelle capture
            </h1> 
            <form onSubmit={this.handleStartCaptureSession}>
              <Input type="text"
               name="method"
               onChange={this.handleCaptureSession}
               label="Comment l'oiseau à t'il été capturé ? (Au nid, au filet, etc.)"
               value={method}
               className="form-control h-margin-top--tiny"
             />
             <button type="submit" className="btn btn-primary h-margin-top--tiny h-margin-bottom--small">
               Commencer la capture
             </button>
            </form>
          </div>
      )
    } else {
    return (
      <div className="container" style={{ marginTop: 8 + "em" }}>
        <h1 style={{ marginBottom: 1 + "em" }}>
          Capture d'un oiseau
        </h1>
        <Link to="/" className="btn btn-outline-primary mb-5">
          Retour
        </Link>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Nom de l'oiseau")}
          <label htmlFor="reprise">
            S'agit t'il d'une reprise ?<br/>
            <input type="radio" name="reprise" onChange={this.handleReprise} value="true"/>
            <span>Oui</span><br/>
            <input type="radio" name="reprise" onChange={this.handleReprise} value="false"/>
            <span>Non</span><br/>
          </label>
          {this.renderInput("numberBadge", "Quel numéro de bague ?")}
          {this.renderInput("latinName", "Quel est son nom latin ?")}
          {this.renderInput(
            "wingsLenght",
            "Quelle est la longueur alaire de l’oiseau ?"
          )}
          {this.renderInput("weight", "Poids")}
          {this.renderInput("adiposity", "Adiposité (niveau de graisse)")}
          {this.renderInput("sex", "Sexe")}
          {this.renderInput("age", "Âge", "number")}
          {this.renderButton("Enregistrer")}
        </form>
      </div>
    );
    }
  }
  render(){
    return(
      <React.Fragment>
        {this.session()}
      </React.Fragment>
    )
  }
}

export default NoRepriseForm;
