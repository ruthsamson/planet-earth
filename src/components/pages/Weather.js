import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider} from "react-helmet-async";
import axios from "axios";
import Loading from "../Loading";
import { Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const Weather = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  


  const url = `http://localhost:8000/weather/${location}`;

  const getData = async (e) => {
        axios.request(url).then((response) => {
            setData(response.data);
            console.log(response.data);
          });
    setLocation('')
    }

  const handleClick = () => {
    getData();
  };

  const handleClickBack = () => {
    window.history.back();
}

  useEffect(() => {
        setTimeout(() => setLoading(false), 1000)
    }, [])

  
    if(loading) {
        return (
            <Loading />
        )
    }
  return (
    <HelmetProvider>
      <div className="weather">
        <Helmet>
          <title>Weather Forecast</title>
          <link rel="stylesheet" href="./css/Weather.css" />
        </Helmet>
        <div className="back">
          <Button  className='btn-vitals'
          onClick={handleClickBack}
          variant="text" 
          size='large' 
          startIcon={<ArrowBack />} 
          >
            Go back to Vitals
          </Button>            
        </div>
        <div className="container">
          <div className="search"> 
            <input 
            value={location} 
            onChange={e => setLocation(e.target.value)}
            placeholder="Enter City" 
            type="text" 
            />
            <button 
            className="btn" 
            onClick={handleClick}
            >
              Enter
            </button>
          </div>
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temperature">
              {data.main ? <h1>{data.main.temp.toFixed()} °F</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
          {data.name !== undefined &&
          <div className="bottom">
            <div className="feels-like bottom-text">
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()} °F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity bottom-text">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind bottom-text">
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Winds</p>
            </div>
          </div>
          }
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Weather;
