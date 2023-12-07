import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import API from "../api/axios";
import "leaflet/dist/leaflet.css";

const CentersMap = () => {
  const mapRef = useRef(null);
  const parisPosition = [48.864716, 2.349014];
  const [centers, setCenters] = useState([]);

  useEffect(() => {
    API.get(`centers`).then((res) => {
      const centers = res.data;
      setCenters(centers["hydra:member"]);
    });
  }, []);

  console.log(centers);
  return (
    <MapContainer
      center={parisPosition}
      zoom={13}
      ref={mapRef}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={parisPosition}>
        <Popup></Popup>
      </Marker> */}
      {centers.map((center) => (
        <Marker
          position={[center["latitude"], center["longitude"]]}
          key={center["id"]}
        >
          <Popup>{[center["name"]]}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default CentersMap;
