import axios from "axios";

export class WeatherApi {
  constructor() {
    this.axios = axios.create({
      baseURL: `http://api.weatherstack.com`,
      params: { access_key: process.env.REACT_APP_WEATHER_API_KEY },
    });
  }

  get(endpoint, params = undefined) {
    return this.axios.get(endpoint, { params });
  }
}
