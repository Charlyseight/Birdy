import React, { Component } from "react";
import firebase from "firebase";
import MarkerClusterer from "@google/markerclustererplus";

class MapBirdy extends Component {
  state = {
    lat: 49.59,
    lng: 6.2,
    zoom: 15,
    capture_sessions: []
  };
  componentDidMount() {
    this.captures();
    window.initMap = this.initMap;
  }

  componentWillUnmount() {
    this.removeMap();
  }

  removeMap() {
    let index = window.document.getElementsByTagName("script")[0];
    index.parentNode.removeChild(index);
    window.google = {};
  }

  renderMap = () => {
    this.script(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBwtKOxhHmPCrSkL36crqsOEfYdQRABgIk&callback=initMap"
    );
  };

  script = url => {
    var index = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    index.parentNode.insertBefore(script, index);
  };

  captures = () => {
    const capture_sessions = firebase.database().ref("capture_sessions");

    capture_sessions.on("value", snapshot => {
      this.setState(
        {
          capture_sessions: snapshot.val()
        },
        this.renderMap()
      );
    });
  };

  initMap = () => {
    const { capture_sessions } = this.state;

    const allCaptures = Object.values(capture_sessions);
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: this.state.lat, lng: this.state.lng },
      zoom: 10
    });

    let markers = allCaptures.map(result => {
      let marker = new window.google.maps.Marker({
        position: { lat: result.location.lat, lng: result.location.lng },
        map: map
      });
      return marker;
    });

    new MarkerClusterer(map, markers, { imagePath: "/map-images/m" });
  };

  render() {
    return <div id="map" style={{ minHeight: "90vh", marginTop: "5.3rem" }} />;
  }
}

export default MapBirdy;
