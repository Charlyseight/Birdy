import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./Components/navbar";
import Birds from "./Components/birds";
import MapBirdy from "./Components/map";
import NotFound from "./Components/notfound";
import RegisterForm from "./Components/registerform";
import LoginForm from "./Components/loginform";
import NoRepriseForm from "./Components/norepriseform";
import NavLogo from "./Components/navLogo";
import allBirds from "./Components/allbirds";
import Users from "./Components/users";
import Captures from "./Components/captures";
import EditCapture from "./Components/editCap";
import firebase from "firebase";
import config from "./config";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  state = {
    personnage: "",
    user: null
  };
  componentDidMount() {
    firebase.initializeApp(config);
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
      }
    });
  }

  render() {
    const { user } = this.state;
    if (user === null) {
      return (
        <React.Fragment>
          <NavLogo />
          <Switch>
            <Route path="/" exact component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
          </Switch>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <NavBar />
        <main>
          <Switch>
            <Route path="/" exact component={NoRepriseForm} />
            <Route path="/birds/:id" component={Birds} />
            <Route path="/map" component={MapBirdy} />
            <Route path="/users" component={Users} />
            <Route path="/allbirds/" component={allBirds} />
            <Route path="/captures" exact component={Captures} />
            <Route path="/captures/:id" component={EditCapture} />
            <Route path="/not-found" exact component={NotFound} />
            <Redirect to="/" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
