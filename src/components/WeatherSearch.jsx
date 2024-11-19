import { useEffect, useState } from "react";
import { useWeatherApi } from "../providers/WeatherApiProvider";
import { useDebounce } from "../hooks/useDebounce";
import OrbitProgress from "react-loading-indicators/OrbitProgress";
import { WeatherCard } from "./WeatherCard";
import "./WeatherStyle.css";

export const WeatherSearch = (props) => {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const api = useWeatherApi();
  const debouncedInput = useDebounce(input, 1000);

  const handleInputChange = async (e) => {
    const location = e.target.value;
    setInput(location);
  };

  useEffect(() => {
    const debouncedFetchLocation = async () => {
      if (debouncedInput.length < 2) {
        return;
      }
      try {
        setWeather(null);
        setIsLoading(true);
        const response = await api.get("/current", { query: debouncedInput });
        setWeather(response.data);
      } catch (e) {
        setWeather({ error: e });
        console.log("err " + e);
      } finally {
        setIsLoading(false);
      }
    };

    debouncedFetchLocation();
  }, [api, debouncedInput]);

  return (
    <div style={{ textAlign: "center" }}>
      <input
        className={"Input-field"}
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter a city"
      />
      <div>
        {isLoading ? <OrbitProgress /> : <WeatherCard weather={weather} />}
      </div>
    </div>
  );
};
