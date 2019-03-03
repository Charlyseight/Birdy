import React from "react";
import { Link } from "react-router-dom";
import Form from "./common/form";

const style = {
  background: "url(" + require("../Images/bird.jpeg") + ")",
  backgroundPosition: "center center",
  backgroundSize: "cover"
};
const img = {
  paddingTop: "20rem"
};

class Home extends Form {
  render() {
    return (
      <div>
        <header className="py-5" style={style}>
          <img className="img-fluid d-block mx-auto" style={img} alt="" />
        </header>
        <div className="container" style={{ marginTop: 3 + "em", marginBottom: 3+ "em" }}>
          
        </div>
      </div>
    );
  }
}

export default Home;
