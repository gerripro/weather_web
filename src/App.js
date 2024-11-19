import "./App.css";
import { WeatherApiProvider } from "./providers/WeatherApiProvider";
import { WeatherSearch } from "./components/WeatherSearch";

function App() {
  return (
    <WeatherApiProvider>
      <WeatherSearch />
    </WeatherApiProvider>
  );
}

export default App;
