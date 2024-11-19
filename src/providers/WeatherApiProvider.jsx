import React, { createContext, useContext } from "react";
import { WeatherApi } from "../api/WeatherApi";

const WeatherApiContext = createContext();

export const WeatherApiProvider = ({ children }) => {
  const weatherApi = new WeatherApi();
  return (
    <WeatherApiContext.Provider value={weatherApi}>
      {children}
    </WeatherApiContext.Provider>
  );
};

export const useWeatherApi = () => {
  const context = useContext(WeatherApiContext);
  if (!context) {
    throw new Error(
      "useWeatherApi must be used" + " within a WeatherApiProvider"
    );
  }
  return context;
};
