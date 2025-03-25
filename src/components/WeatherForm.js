import React, { useState } from "react";
import axios from "axios";
import { Form, ListGroup } from "react-bootstrap";

const API_KEY = "API_KEY"; // Replace with your OpenWeather API key
const GEO_API_URL = "https://api.openweathermap.org/geo/1.0/direct";

function WeatherForm({ setWeatherData }) {

    const [query, setQuery] = useState("");
    const [cityOptions, setCityOptions] = useState([]);
    const [debounceTimer, setDebounceTimer] = useState(null);

    const fetchCities = async (searchQuery) => {
        // Wait to query until at least 3 chars typed
        if (searchQuery.length < 3) {
            setCityOptions([]);
            return;
        }

        try {
            // Request first 5 cities matching name input
            const response = await axios.get(GEO_API_URL, {
                params: { q: searchQuery, limit: 5, appid: API_KEY },
            });

            // Check if non-empty array response was received
            if (Array.isArray(response.data) && response.data.length > 0) {
                setCityOptions(response.data);
            } else {
                setCityOptions([]);
            }

        } catch (error) {
            alert("Error fetching city data.");
        }
    };

    const handleInputChange = (e) => {

        // Clear previous data
        setWeatherData(null);
        const searchQuery = e.target.value;
        setQuery(searchQuery);

        // Clear previous timer
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        // Make the API call 250ms after typing ends
        const newTimer = setTimeout(() => {
            fetchCities(searchQuery); 
        }, 250);
        setDebounceTimer(newTimer);
    };

    const fetchWeather = async (city) => {

        try {
            const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
                params: { lat: city.lat, lon: city.lon, appid: API_KEY, units: "imperial" },
            });

            // Append previously received state field to response.data
            const weatherDataPlusState = {
                ...response.data,
                state: city.state
            };

            setWeatherData(weatherDataPlusState);
            setCityOptions([]); // Hide city list
            setQuery(""); // Clear input
            //alert(`${response.data.main.temp}`)
        } catch (error) {
            alert("Error fetching weather data.");
        }
    };

    return (
        <div>
            <Form className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Enter city name..."
                    value={query}
                    onChange={handleInputChange}
                />
            </Form>

            {/* City Selection List */}
            {cityOptions.length > 0 && (
                <ListGroup>
                    {cityOptions.map((city) => (
                        <ListGroup.Item
                            key={`${city.lat},${city.lon},${city.state}`}
                            action
                            onClick={() => fetchWeather(city)} // {() => alert(`${city.name}`)}
                        >
                            {city.name}, {city.state ? city.state + ", " : ""}{city.country}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
}

export default WeatherForm;