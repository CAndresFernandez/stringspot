import React, { useEffect, useState } from "react";
import Forecast from "./Forecast";

const londonCoordinates = [51.5, -0.12];
const parisCoordinates = [48.86, 2.34];
const nycCoordinates = [40.73, -73.99];

const DateSelect: React.FC<{ city: string }> = ({ city }) => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  useEffect(() => {
    if (city.toLowerCase() === "paris") {
      setLatitude(parisCoordinates[0]);
      setLongitude(parisCoordinates[1]);
    } else if (city.toLowerCase() === "london") {
      setLatitude(londonCoordinates[0]);
      setLongitude(londonCoordinates[1]);
    } else if (city.toLowerCase() === "nyc") {
      setLatitude(nycCoordinates[0]);
      setLongitude(nycCoordinates[1]);
    }
  }, [city]);

  return (
    <div className="date-select">
      <Forecast latitude={latitude} longitude={longitude} />
    </div>
  );
};

export default DateSelect;
