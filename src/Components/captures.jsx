import React, { Component } from "react";
import firebase from "firebase";
import { NavLink } from "react-router-dom";

class Captures extends Component {
  state = {
    captures: null,
    uid: firebase.auth().currentUser.uid
  };

  componentDidMount() {
    const userId = this.state.uid;
    const single_captures = firebase.database().ref("single_captures");
    single_captures
      .orderByChild("uid")
      .equalTo(userId)
      .on("value", single_captures => {
        this.setState({ captures: single_captures.val() });
      });
  }

  renderCaptures() {
    const { captures } = this.state;
    if (captures !== null) {
      const objects = Object.keys(captures);
      return (
        <React.Fragment>
          {objects.map((key, capture) => (
            <div
              key={key}
              className="container"
              style={{ marginBottom: "40px" }}
            >
              <ul className="list-group-item list-group-flush">
                <li className="list-group-item">
                  <h1>{captures[key].name}</h1>
                  <h2
                    style={{
                      color: "#ccc",
                      fontSize: "20px",
                      marginTop: "5px"
                    }}
                  >
                    {captures[key].latinName}
                  </h2>
                </li>
                <li className="list-group-item">
                  <span className="font-weight-bold">Age: </span>
                  {captures[key].age}
                </li>
                <li className="list-group-item">
                  <span className="font-weight-bold">Adiposité: </span>
                  {captures[key].adiposity}
                </li>
                <li className="list-group-item">
                  <span className="font-weight-bold">Sexe: </span>
                  {captures[key].sex}
                </li>
                <li className="list-group-item">
                  <span className="font-weight-bold">Reprise: </span>
                  {captures[key].reprise}
                </li>
                <li className="list-group-item">
                  <span className="font-weight-bold">Numéro du badge: </span>
                  {captures[key].numberBadge}
                </li>
                <li className="list-group-item">
                  <span className="font-weight-bold">Poids: </span>
                  {captures[key].weight}
                </li>
                <li className="list-group-item">
                  <span className="font-weight-bold">Longueur d'aile: </span>
                  {captures[key].wingsLenght}
                </li>
                <NavLink
                  to={"/captures/" + key}
                  key={key}
                  className="btn btn-primary"
                  style={{ margin: "15px" }}
                >
                  Editer
                </NavLink>
              </ul>
            </div>
          ))}
        </React.Fragment>
      );
    } else {
      return <p>Vous n'avez pas de captures</p>;
    }
  }
  render() {
    return <div>{this.renderCaptures()}</div>;
  }
}

export default Captures;
