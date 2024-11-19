export const WeatherCard = (props) => {
  const { weather } = props;

  if (!weather) {
    return null;
  }
  if (weather && weather.error) {
    return <h2>Error retrieving data from a server</h2>;
  }
  return (
    <div>
      <h1>Today the Weather in</h1>
      <h2>
        {weather.location.name}, <span>{weather.location.country}</span>
      </h2>
      <h2>
        {weather.current.temperature}
        <sup>°C</sup>
      </h2>
      <img src={weather.current.weather_icons[0]} alt={"weather-icon"} />
      <p>Observation time: {weather.current.observation_time}</p>
      <p>Description: {weather.current.weather_descriptions[0]}</p>
      <p>Wind Speed: {weather.current.wind_speed}m/s</p>
    </div>
  );
};
