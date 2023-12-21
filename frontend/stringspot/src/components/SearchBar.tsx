import API from "../api/axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { ICenter } from "../@types/center";
import { IZone } from "../@types/zone";

interface SearchBarProps {
  onResultClick: (suggestion: ICenter) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onResultClick }) => {
  const [apiCenters, setApiCenters] = useState<ICenter[]>([]);
  const [apiZones, setApiZones] = useState<IZone[]>([]);
  const [searchItem, setSearchItem] = useState("");
  const [suggestions, setSuggestions] = useState<(ICenter | IZone)[]>([]);
  const [hideSuggestions, setHideSuggestions] = useState(true);

  useEffect(() => {
    Promise.all([API.get(`centers`), API.get(`zones`)])
      .then(([centersRes, zonesRes]) => {
        // process centers
        const centers = centersRes.data;
        let toAddCentersArray: ICenter[] = [];
        centers["hydra:member"].map(
          (center: ICenter) =>
            (toAddCentersArray = [...toAddCentersArray, center])
        );
        setApiCenters(toAddCentersArray);
        setSuggestions(toAddCentersArray);

        // process zones
        const zones = zonesRes.data;
        let toAddZonesArray: IZone[] = zones["hydra:member"];
        setApiZones(toAddZonesArray);
        setSuggestions((prevSuggestions) => [
          ...prevSuggestions,
          ...toAddZonesArray,
        ]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchTerm: string = event.target.value;
    setSearchItem(searchTerm);
    if (searchTerm.trim() === "") {
      setHideSuggestions(true);
      return;
    }
    setHideSuggestions(false);

    // filter centers
    const filteredCenters = apiCenters.filter((center) =>
      center.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // filter zones
    const filteredZones = apiZones.filter((zone) =>
      zone.post_code.includes(searchTerm)
    );

    // set suggestions with both
    setSuggestions([...filteredCenters, ...filteredZones]);
  };

  //   function to grab the appropriate text to display in the search suggestions
  const getDisplayText = (suggestion: ICenter | IZone): string => {
    if ("name" in suggestion) {
      return suggestion.name;
    } else if ("post_code" in suggestion) {
      return suggestion.city + " - " + suggestion.post_code;
    }
    return "";
  };

  const handleResultClick = (suggestion: ICenter | IZone) => {
    onResultClick && onResultClick(suggestion as ICenter);
    setHideSuggestions(true);
  };

  return (
    <>
      <div className="search-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Center Name or Postal Code..."
          value={searchItem}
          onChange={handleSearchInputChange}
          onBlur={() => {
            setTimeout(() => {
              setHideSuggestions(true);
            }, 200);
          }}
        />
        <div
          className={`${"suggestions-wrapper"} ${
            hideSuggestions ? "hidden" : ""
          }`}
        >
          {suggestions.length === 0 ? (
            <p className="no-results">No results found. Please try again...</p>
          ) : (
            <ul className="suggestions">
              {suggestions.map((suggestion: ICenter | IZone) => (
                <li
                  key={suggestion.id}
                  className="suggestion"
                  onClick={() => handleResultClick(suggestion)}
                >
                  {getDisplayText(suggestion)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
