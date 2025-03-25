import React, { useState } from "react";
import WeatherForm from "./components/WeatherForm";
import WeatherDisplay from "./components/WeatherDisplay";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const [weatherData, setWeatherData] = useState(null);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="text-center mb-4">
                        <h1 className="display-4 text-primary">Current Weather</h1>
                    </div>

                    <div className="card shadow-lg rounded bg-light p-4">
                        <WeatherForm setWeatherData={setWeatherData}/>
                    </div>

                    {/* Only render if weatherData is non-null */}
                    {weatherData && (
                        <div className="container bg-blue mt-4 p-4">
                            <WeatherDisplay weatherData={weatherData}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
