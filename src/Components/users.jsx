import React, { Component } from "react";
import firebase from "firebase";

export default class Users extends Component {
  state = {
    users: [],
    loading: true,
  };
  componentDidMount() {
    this.getCapturesOfUsers()
  }

  getCapturesOfUsers () {
     const allusers = {...this.state.users}
     const theusers = firebase.database().ref("Utilisateurs");
      const single_captures = firebase.database().ref('single_captures');
      theusers.on('child_added', (theusers) => {
      let userId = theusers.key;
      allusers[userId] = {information:'', capturesamount: null}
      allusers[userId].information = theusers.val()
      single_captures.orderByChild("uid").equalTo(userId).on('value', (singlecaptures) => {
      allusers[userId].capturesamount = singlecaptures.val() ? Object.values(singlecaptures.val()).length : 0
      this.setState({users: allusers, loading: false})
      })
    })
  } 

  renderUsers(){
    if (this.state.loading) {
      return <p>Chargement...</p>;
    }
    const {users} = this.state;
    if (users !== null) {
      const theusers = Object.values(users);
      return (
        <React.Fragment>
          {
            theusers.map((user, key) =>
              <div key={key}>
                <h2>{user.latin_name}</h2>
                <ul className="list-group">
                  <li className="list-group-item">
                    <span>Utilisateur : {user.information.name} {user.information.lastname}</span>
                    <br/>
                    <span>Nombre de captures : {user.capturesamount}</span>
                  </li>
                </ul>
              </div>
            )
          }
        </React.Fragment>
      )}
  }
    render(){
      return (
        <React.Fragment>
          <div className="container" style={{marginTop: "8em"}}>
            <h1>Les utilisateurs</h1>
            {this.renderUsers()}
          </div>
      </React.Fragment>
      )
    }
  }
