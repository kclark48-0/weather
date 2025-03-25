import React from "react";
import { Card } from "react-bootstrap";

function WeatherDisplay({ weatherData }) {
    if (!weatherData) return null;

    const { name, state, sys, weather, main, wind } = weatherData;

    // Import weather icon from openweathermap API based on icon code in weatherData[weather]
    const weatherIcon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    return (
        <Card className="mt-4 shadow-lg border-primary rounded">
            <Card.Body className="text-center">

                {/* City Name, Country Code*/}
                <Card.Title className="fs-3 fw-bold">
                    {name}, {state ? ` ${state}, ` : ""} {sys.country}
                </Card.Title>

                {/* Weather Icon */}
                <div className="d-flex justify-content-center align-items-center">
                    <img src={weatherIcon} alt={weather[0].description} className="me-2"/>
                </div>

                {/* Weather Description */}
                <Card.Subtitle className="mb-3 text-muted text-capitalize">
                    {weather[0].description}
                </Card.Subtitle>

                {/* Weather Details */}
                <Card.Text className="fs-5">
                    <strong>Temperature:</strong> {Math.round(main.temp)}&deg;F <br/>
                    <strong>Humidity:</strong> {main.humidity}% <br/>
                    <strong>Wind Speed:</strong> {Math.round(wind.speed)}mph
                </Card.Text>

            </Card.Body>
        </Card>
    );
}

export default WeatherDisplay;
