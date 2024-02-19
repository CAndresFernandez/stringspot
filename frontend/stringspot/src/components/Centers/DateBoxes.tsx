import React, { useEffect, useState } from "react";
import { fetchWeatherApi } from "openmeteo";
import Availabilities from "./Availabilities";

type WeatherData = {
  daily: {
    time: Date[];
    weatherCode: Float32Array;
    temperatureMax: Float32Array;
    temperatureMin: Float32Array;
  };
};

const DateBoxes: React.FC<{
  latitude: number;
  longitude: number;
}> = ({ latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    const params = {
      latitude: latitude,
      longitude: longitude,
      daily: "weather_code,temperature_2m_max,temperature_2m_min",
    };
    const url = import.meta.env.VITE_OPENMETEO_URL;
    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    fetchWeatherApi(url, params).then((res) => {
      const response = res[0];
      const utcOffsetSeconds = response.utcOffsetSeconds()!;
      const daily = response.daily()!;

      const weatherData = {
        daily: {
          time: range(
            Number(daily.time()),
            Number(daily.timeEnd()),
            daily.interval()
          ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
          weatherCode: daily.variables(0)!.valuesArray()!,
          temperatureMax: daily.variables(1)!.valuesArray()!,
          temperatureMin: daily.variables(2)!.valuesArray()!,
        },
      };
      setWeatherData(weatherData);
    });
  }, [latitude, longitude]);

  function convertDate(day: Date) {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "numeric",
    };
    return day.toLocaleDateString(undefined, options);
  }

  function convertTemp(temp: number) {
    return Math.floor(temp);
  }

  function handleClick(index: number) {
    return (event: React.MouseEvent) => {
      setActiveIndex(index);
      event.preventDefault();
    };
  }

  function weatherIcon(wmoCode: number, maxTemp: number): string {
    if (wmoCode <= 2 && wmoCode > 0) {
      return "fa-solid fa-cloud-sun";
    } else if (wmoCode === 45 || wmoCode === 48 || wmoCode === 3) {
      return "fa-solid fa-cloud";
    } else if (wmoCode >= 51 && wmoCode <= 67) {
      return "fa-solid fa-cloud-rain";
    } else if (
      (wmoCode >= 71 && wmoCode <= 77) ||
      (wmoCode >= 85 && wmoCode <= 86)
    ) {
      return "fa-solid fa-snowflake";
    } else if (wmoCode >= 80 && wmoCode <= 82) {
      return "fa-solid fa-cloud-showers-heavy";
    } else if (wmoCode >= 95 && wmoCode <= 99) {
      return "fa-solid fa-cloud-bolt";
    } else if (maxTemp > 34) {
      return "fa-solid fa-temperature-full";
    }
    return "fa-solid fa-sun";
  }

  return (
    <>
      <div className="date-select">
        {weatherData?.daily.time.slice(0, 7).map((day, index) => (
          <div
            key={index}
            className={`date-box${activeIndex === index ? ` selected` : ``}`}
            onClick={handleClick(index)}
          >
            <div className="date-box-2">
              <p className="date-box-header">{convertDate(day)}</p>
              <p className="date-box-text">
                Min {convertTemp(weatherData?.daily.temperatureMin[index])}
                &deg;C
              </p>
              <p className="date-box-text">
                Max {convertTemp(weatherData?.daily.temperatureMax[index])}
                &deg;C
              </p>
              <i
                className={`weather-icon ${weatherIcon(
                  weatherData?.daily.weatherCode[index],
                  weatherData?.daily.temperatureMax[index]
                )}`}
              ></i>
            </div>
          </div>
        ))}
      </div>
      <div className="availabilities-wrapper">
        <Availabilities dateIndex={activeIndex} />
      </div>
    </>
  );
};

export default DateBoxes;
