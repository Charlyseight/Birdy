import React, { Component } from 'react';
import firebase from "firebase";

class allBirds extends Component {
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
      renderBirds() {
        if (this.state.loading) {
          return <p className="container" style={{marginTop: "8em"}}>Chargement...</p>;
        }
        const birds = this.state.encyclopedie.map((bird, index) => {
          return(
            <div key={index}>
              <a href={'/birds/' + index}>
              <img
                src={bird.image}
                alt=""
                style={{width:"370px", height:"270px"}}
                className="img-thumbnail"
              />
              <p className="post-title">{bird.nom}</p>
              </a>
              </div>
          )
        });
        return <div className="container " style={{marginTop:"8em", display:"flex", flexWrap:"nowrap"}}>{birds}</div>;
      }

      render(){
        return(
          <div>
            {this.renderBirds()}
          </div>
        )
      }
}
 
export default allBirds;