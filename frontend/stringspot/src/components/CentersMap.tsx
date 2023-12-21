import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import API from "../api/axios";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";
import { LatLngExpression } from "leaflet";
import SearchBar from "./SearchBar";
import { ICenter } from "../@types/center";
import { IZone } from "../@types/zone";
import L from "leaflet";
import postCodeSearch from "../api/postCodeSearch";

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
  const [centers, setCenters] = useState<ICenter[]>([]);

  useEffect(() => {
    API.get(`centers`).then((res) => {
      const centers = res.data;
      setCenters(centers["hydra:member"]);
    });
  }, []);

  const handleSearchBarFocus = () => {
    map.dragging.disable();
    map.scrollWheelZoom.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
  };

  const handleSearchBarBlur = () => {
    map.dragging.enable();
    map.scrollWheelZoom.enable();
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.boxZoom.enable();
    map.keyboard.enable();
  };

  const handleResultClick = (suggestion: ICenter | IZone) => {
    if (
      "latitude" in suggestion &&
      "longitude" in suggestion &&
      "id" in suggestion
    ) {
      const { latitude, longitude } = suggestion;
      map.flyTo([latitude, longitude], 17);
      const latlng = L.latLng(latitude ?? 0, longitude ?? 0);
      const popup = L.popup()
        .setLatLng(latlng)
        .setContent(
          "<div class='popup-wrapper'><span class='popup-title'>" +
            `${suggestion.name}` +
            "</span>" +
            `${suggestion.address}` +
            "<br />" +
            `${suggestion.zone?.post_code}` +
            " " +
            `${suggestion.zone?.city}` +
            "<br /><button class='popup-button button'>Reserve</button></div>"
        );
      map.openPopup(popup);
    } else if ("post_code" in suggestion) {
      const apiKey = import.meta.env.VITE_GEOAPIFY_KEY;
      postCodeSearch
        .get(
          `search?postcode=${suggestion.post_code}&format=json&apiKey=${apiKey}`
        )
        .then((res) => {
          const results = res.data["results"];
          if (results.length > 1) {
            results.map((result: any) => {
              if (result["city"] === suggestion.city) {
                const latitude = result["lat"];
                const longitude = result["lon"];
                const latlng = L.latLng(latitude, longitude);
                map.flyTo(latlng, 14);
              }
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };

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
          scrollWheelZoom={false}
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
              position={[center.latitude, center.longitude] as LatLngExpression}
              key={center["id"]}
            >
              <Popup>
                <div className="popup-wrapper">
                  <span className="popup-title">{[center["name"]]}</span>
                  {[center["address"]]}
                  <br />
                  {[center.zone?.post_code]} {[center.zone?.city]}
                  <br />
                  <button className="popup-button button">Reserve</button>
                </div>
              </Popup>
            </Marker>
          ))}
          <SearchBar
            onResultClick={handleResultClick}
            onBlur={handleSearchBarBlur}
            onFocus={handleSearchBarFocus}
          />
        </MapContainer>
      </div>
    </>
  );
};

export default CentersMap;
