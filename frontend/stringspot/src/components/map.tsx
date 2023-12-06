import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const CentersMap = () => {
  const mapRef = useRef(null);
  const parisPosition = [48.864716, 2.349014];
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
      <Marker position={parisPosition}>
        <Popup></Popup>
      </Marker>
    </MapContainer>
  );
};

export default CentersMap;
