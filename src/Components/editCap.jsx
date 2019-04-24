import React from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import Input from "./common/input";
import PopUp from "./popUp";

class EditCapture extends Form {
  state = {
    capture: {
      key: "",
      age: "",
      adiposity: "",
      sex: "",
      latinName: "",
      reprise: "",
      numberBadge: "",
      session_id: "",
      weight: "",
      wingsLenght: ""
    },
    captureId: null,
    errors: {},
    popUp: {
      show: false,
      text: ""
    }
  };
  componentDidMount() {
    const captureId = this.props.match.params.id;
    const capturedb = firebase.database().ref("single_captures");
    capturedb
      .orderByKey()
      .equalTo(captureId)
      .on("value", result => {
        let singlecapture = {};
        result.forEach(onecapture => {
          const {
            age,
            name,
            adiposity,
            sex,
            latinName,
            reprise,
            numberBadge,
            weight,
            wingsLenght,
            session_id,
            uid
          } = onecapture.val();
          singlecapture = {
            key: onecapture.key,
            name,
            age,
            adiposity,
            sex,
            latinName,
            reprise,
            numberBadge,
            weight,
            wingsLenght,
            session_id,
            uid
          };
        });
        this.setState(prevState => ({
          captureId,
          capture: {
            ...prevState.capture,
            key: singlecapture.key,
            name: singlecapture.name,
            age: singlecapture.age,
            adiposity: singlecapture.adiposity,
            sex: singlecapture.sex,
            latinName: singlecapture.latinName,
            reprise: singlecapture.reprise,
            numberBadge: singlecapture.numberBadge,
            weight: singlecapture.weight,
            wingsLenght: singlecapture.wingsLenght,
            session_id: singlecapture.session_id,
            uid: singlecapture.uid
          }
        }));
      });
  }

  schema = {
    name: Joi.string()
      .required()
      .label("Nom de l'oiseau"),
    reprise: Joi.boolean()
      .required()
      .truthy("oui")
      .falsy("non")
      .label("S‘agit t‘il d‘une reprise ?"),
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
    uid: Joi.string()
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleAdd = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }
    const capture = { ...this.state.capture };
    capture[input.name] = input.value;
    this.setState({ capture, errors });
  };

  handleUpdate = e => {
    e.preventDefault();
    const {
      age,
      adiposity,
      sex,
      name,
      latinName,
      reprise,
      numberBadge,
      session_id,
      uid,
      weight,
      wingsLenght,
      popUp,
    } = this.state.capture;
    let putupdatedata = "single_captures/" + this.state.captureId;
    const updatedatas = firebase.database().ref(putupdatedata);

    updatedatas
      .update({
        age,
        adiposity,
        sex,
        name,
        latinName,
        reprise,
        numberBadge,
        session_id,
        uid,
        weight,
        wingsLenght
      })
      .then(() => {
        this.setState({
          popUp: {
            show: true,
            text:"Vos modifications ont bien été enregistrées. Vous aller être redirigé vers la page 'Vos captures'."
          }
        });
        setTimeout(() => {
          this.setState({
            popUp: {
              show: false
            }
          });
          this.props.history.push('/captures');
        }, 5000);
      });
  };
  renderCapture() {
    const { capture, errors, popUp } = this.state;
    const {
      age,
      name,
      adiposity,
      sex,
      latinName,
      reprise,
      numberBadge,
      weight,
      wingsLenght
    } = this.state.capture;
    if (capture !== null) {
      return (
        <div className="container">
          {popUp.show && <PopUp message={popUp.text} />}
          <form onSubmit={this.handleUpdate} action="" className="">
            <Input
              type="text"
              name="name"
              onChange={this.handleAdd}
              label="Nom"
              value={name}
              errormessage={errors.name}
            />
            <Input
              type="text"
              name="latinName"
              onChange={this.handleAdd}
              label="Nom latin"
              value={latinName}
              errormessage={errors.latinName}
            />
            <Input
              type="text"
              name="numberBadge"
              onChange={this.handleAdd}
              label="Numéro de la bague"
              value={numberBadge}
              className=""
              errormessage={errors.numberBadge}
            />
            <Input
              type="text"
              name="age"
              onChange={this.handleAdd}
              label="Age de l'oiseau"
              value={age}
              className=""
              errormessage={errors.age}
            />
            <div>
              <p>S'agit il d'une reprise?</p>
              <div>
                <label className="" htmlFor="oui">
                  <input
                    type="radio"
                    name="reprise"
                    onChange={this.handleAdd}
                    value="oui"
                    checked={reprise === "oui"}
                    id="oui"
                    aria-describedby="Il s’agit d'une reprise"
                  />
                  <span>Oui</span>
                </label>
                <label htmlFor="non">
                  <input
                    type="radio"
                    name="reprise"
                    onChange={this.handleAdd}
                    value="non"
                    checked={reprise === "non"}
                    id="non"
                    aria-describedby="Il ne s’agit pas d'une reprise"
                  />
                  <span>Non</span>
                </label>
              </div>
              {errors.reprise && <span>{errors.reprise}</span>}
            </div>
            <div className="">
              <p className="">Sexe de l'oiseau</p>
              <div className="">
                <label className="" htmlFor="sex">
                  <input
                    type="text"
                    name="sex"
                    onChange={this.handleAdd}
                    label="Sexe de l'oiseau"
                    value={sex}
                    className=""
                    errormessage={errors.sex}
                  />
                </label>
              </div>
            </div>
            <Input
              type="text"
              name="adiposity"
              onChange={this.handleAdd}
              label="Adiposité"
              value={adiposity}
              className=""
              errormessage={errors.adiposity}
            />
            <Input
              type="text"
              name="wingsLenght"
              onChange={this.handleAdd}
              label="Longueur alaire"
              value={wingsLenght}
              className=""
              errormessage={errors.wingsLenght}
            />
            <Input
              type="text"
              name="weight"
              onChange={this.handleAdd}
              label="Poids de l'oiseau"
              value={weight}
              className=""
              errormessage={errors.weight}
            />
            <button
              disabled={this.validate()}
              type="submit"
              className="btn btn-primary"
              style={{ margin: "1em 1em 3em 0em" }}
            >
              Enregistrer les changements
            </button>
            <Link
              className="btn btn-danger"
              style={{ margin: "1em 1em 3em 0em" }}
              to="/captures"
            >
              Annuler l'edition
            </Link>
          </form>
        </div>
      );
    } else {
      return <p>No data yet</p>;
    }
  }
  render() {
    return (
      <React.Fragment>
        <h1 style={{ margin: "1.3em 2.7em" }}>Modification d'une capture</h1>
        {this.renderCapture()}
      </React.Fragment>
    );
  }
}

export default EditCapture;
