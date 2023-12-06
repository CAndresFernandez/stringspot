import React, { useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const CentersMap = () => {
  const mapRef = useRef(null);
  const parisLatitude = 48.864716;
  const parisLongitude = 2.349014;
  return (
    <MapContainer
      center={[parisLatitude, parisLongitude]}
      zoom={13}
      ref={mapRef}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[48.864716, 2.349014]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default CentersMap;
