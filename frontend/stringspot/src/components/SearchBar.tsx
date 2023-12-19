import API from "../api/axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { ICenter } from "../@types/center";
// import { IZone } from "../@types/zone";

const SearchBar = () => {
  const [apiCenters, setApiCenters] = useState<ICenter[]>([]);
  //   const [apiZones, setApiZones] = useState([]);
  //   const [apiCities, setApiCities] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [suggestions, setSuggestions] = useState<ICenter[]>([]);
  const [hideSuggestions, setHideSuggestions] = useState(true);

  useEffect(() => {
    API.get(`centers`)
      .then((res) => {
        const centers = res.data;
        let toAddArray: ICenter[] = [];
        centers["hydra:member"].map(
          (center: ICenter) => (toAddArray = [...toAddArray, center])
        );
        setApiCenters(toAddArray);
        setSuggestions(toAddArray);
      })

      // API.get(`zones`)
      //   .then((res) => {
      //     const apiZones = res.data;
      //     setApiZones(apiZones["hydra:member"]);
      //     // setApiCities(apiZones["hydra:member"]["city"]);
      //     setSuggestions(...suggestions, apiZones);
      //   })
      .catch((err) => console.log(err));
  }, []);

  const handleSearchInputChange = (event: any) => {
    const searchTerm: string = event.target.value;
    setSearchItem(searchTerm);
    const filteredSuggestions = apiCenters.filter((center) =>
      center.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSuggestions(filteredSuggestions);

    // const filteredZones = apiZones.filter((zone: IZone) =>
    //   zone.post_code.includes(searchTerm)
    // );
    // filteredZones.map((zone: IZone) =>
    //   setSuggestions(...suggestions, zone.post_code)
    // );
  };

  return (
    <>
      <div className="search-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search..."
          value={searchItem}
          onChange={handleSearchInputChange}
          onFocus={() => setHideSuggestions(false)}
          onBlur={async () => {
            setTimeout(() => {
              setHideSuggestions(true);
            }, 200);
          }}
        />
        <div
          className={`${"suggestions-wrapper"} ${hideSuggestions && "hidden"}`}
        >
          <ul className="suggestions">
            {suggestions.map((suggestion: ICenter) => (
              <li key={suggestion.id} className="suggestion">
                {suggestion.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
