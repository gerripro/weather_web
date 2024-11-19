import {useEffect, useState} from "react";
import {useWeatherApi} from "../providers/WeatherApiProvider";
import {useDebounce} from "../hooks/useDebounce";

// todo: Suggestions API not available. delete it
export const LocationSearch = (props) => {
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const api = useWeatherApi();
    const debouncedInput = useDebounce(input, 1000);

    useEffect(() => {
        const debouncedFetchSuggestions = async () => {
            if (debouncedInput.length < 2) {
                setSuggestions([]);
                return;
            }
            try {
                const response = await api.get("/autocomplete", { query: debouncedInput });
                const data = response.data;

                if (data.error) {
                    setSuggestions([]);
                    return;
                }

                setSuggestions(data.results || []);
            } catch (err) {
                setSuggestions([]);
            }
        };
        debouncedFetchSuggestions();
    }, [api,debouncedInput]);

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion.name);
        setSuggestions([]);
    };
    const handleInputChange = async (e) => {
        const location = e.target.value;
        setInput(e.target.value);
    }

    return (
        <div>
            <input type='text' value={input} onChange={handleInputChange}
                   placeholder="Enter a city"/>
            <ul>
                {suggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                        {suggestion.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}