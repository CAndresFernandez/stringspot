import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import API from "../api/axios";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";
import { LatLngExpression } from "leaflet";

const CentersMap = () => {
  const mapRef = useRef();
  const map = mapRef.current;
  const parisPosition: LatLngExpression = [48.864716, 2.349014];
  const londonPosition: LatLngExpression = [
    51.50692285821639, -0.12701159542844373,
  ];
  const nycPosition: LatLngExpression = [
    40.735006424621766, -73.99031122791754,
  ];
  const [centers, setCenters] = useState([]);

  useEffect(() => {
    API.get(`centers`).then((res) => {
      const centers = res.data;
      setCenters(centers["hydra:member"]);
    });
  }, []);

  return (
    <>
      <div className="main-box map-wrapper">
        <div className="textbox">
          <h2 className="textbox-title">Cities</h2>
          <button
            onClick={() => map.panTo(parisPosition)}
            className="button map-button"
          >
            Paris
          </button>
          <button
            onClick={() => map.panTo(londonPosition)}
            className="button map-button"
          >
            London
          </button>
          <button
            onClick={() => map.panTo(nycPosition)}
            className="button map-button"
          >
            NYC
          </button>
          <span>More coming soon...</span>
        </div>
        <div id="map"></div>
        <MapContainer
          center={parisPosition}
          zoom={12}
          ref={mapRef}
          style={{
            height: "100%",
            width: "100%",
            boxShadow:
              "0 8px 8px 0 rgba(0, 0, 0, .2), 0 10px 10px 0 rgba(0, 0, 0, 0.2), 0 12px 36px 0 rgba(0, 0, 0, 0.2), 0 0 0 1px #363333",
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {centers.map((center) => (
            <Marker
              position={[center["latitude"], center["longitude"]]}
              key={center["id"]}
            >
              <Popup>
                <div className="popup-wrapper">
                  <span className="popup-title">{[center["name"]]}</span>
                  {[center["address"]]}
                  <br />
                  {[center["zone"]["post_code"]]} {[center["zone"]["city"]]}
                  <br />
                  <button className="popup-button button">Reserve</button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
};

export default CentersMap;
