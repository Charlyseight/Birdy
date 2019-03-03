import React, { Component } from "react";
import {Link} from "react-router-dom";
import firebase from "firebase";

class Birds extends Component {
  state = {
    encyclopedie: [],
    loading: true
  };
  componentDidMount() {
    const ref = firebase.database().ref("Encyclopédie");
    ref.on("value", snapshot => {
      this.setState({ encyclopedie: snapshot.val(), loading: false });
    });
  }
  render() {
    if (this.state.loading) {
      return <p className="container" style={{marginTop: "8em"}}>Chargement...</p>;
    }
    const getId = this.props.match.params.id
    const bird = this.state.encyclopedie[getId]
      return (
        <div className="container" style={{ marginTop: 8 + "em" }}>
        <Link to="/allbirds" className="btn btn-dark mb-3">
          Retour
        </Link>
        <ul className="list-group">
          <li className="list-group-item">
          <h1 className="post-title">{bird.nom}</h1>
          <h2 className="">{bird.latin}</h2>
          <img
            src={bird.image}
            alt=""
            width="300"
            height="auto"
            style={{ display: "block" }}
          />
          <span
            className="badge badge-secondary"
            style={{
              margin: "0.5rem 0.5rem 0.5rem 0rem",
              fontSize: "18px",
              fontWeight: "100"
            }}
          >
            Poids : {bird.poids}
          </span>
          <span
            className="badge badge-secondary m-2"
            style={{ fontSize: "18px", fontWeight: "100" }}
          >
            Taille : {bird.taille}
          </span>
          <span
            className="badge badge-secondary m-2"
            style={{ fontSize: "18px", fontWeight: "100" }}
          >
            Envergure : {bird.envergure}
          </span>
          <h3>Description - Identification</h3>
          <p>{bird.identification}</p>
          <h3>Habitat</h3>
          <p>{bird.habitat}</p>
          <h3>Comportement traits de caractère</h3>
          <p>{bird.comportement}</p>
          <h3>Alimentation mode et régime</h3>
          <p>{bird.alimentation}</p>
          <h3>Reproduction nidification</h3>
          <p>{bird.nidification}</p>
          <h3>Distribution</h3>
          <p>{bird.distribution}</p>
          <h3>Chant de l'oiseau</h3>
          <audio className="custom-audio-small" controls src={bird.son}>Your bromser does not support
          <code>audio</code> element.
          </audio>
          </li>
        </ul>
        </div>
      );
  }
}

export default Birds;
