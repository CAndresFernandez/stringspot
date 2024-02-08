import React, { useEffect, useState } from "react";
import { fetchWeatherApi } from "openmeteo";

type WeatherData = {
  daily: {
    time: Date[];
    weatherCode: Float32Array;
    temperatureMax: Float32Array;
    temperatureMin: Float32Array;
  };
};

const Forecast: React.FC<{
  latitude: number;
  longitude: number;
}> = ({ latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

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

  console.log(weatherData?.daily.time.length);

  return (
    <>
      {weatherData?.daily.time.slice(0, 7).map((day, index) => (
        <div key={index} className="date-box">
          <p>{convertDate(day)}</p>
          <p>Min: {convertTemp(weatherData?.daily.temperatureMin[index])}</p>
          <p>Max: {convertTemp(weatherData?.daily.temperatureMax[index])}</p>
        </div>
      ))}
    </>
  );
};

export default Forecast;
