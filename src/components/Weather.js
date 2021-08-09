import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useQuery } from "react-query";
import LinearProgress from "@material-ui/core/LinearProgress";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import { useAws } from "../context/AWSContext";

const WeatherApp = () => {
  const date = new Date();

  return (
    <Container>
      <Typography style={{ fontWeight: "bold" }} variant="h6">
        {format(date, "eeee dd MMMM yyyy")}
      </Typography>
      <Weather />
    </Container>
  );
};

export default WeatherApp;

const Weather = () => {
  const { cognitoUser } = useAws();
  const [location, setLocation] = useState({});

  const hasLocation = "lat" in location && "lon" in location ? true : false;

  useEffect(() => {
    const locationData = cognitoUser?.attributes?.["custom:location"];
    if (locationData) {
      setLocation(JSON.parse(locationData));
    }
    // eslint-disable-next-line
  }, []);

  const { isLoading, error, data } = useQuery(
    "weatherData",
    () =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&APPID=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`
      ).then(res => res.json()),
    { enabled: hasLocation }
  );

  if (isLoading) return <LinearProgress />;

  if (error || !hasLocation)
    return (
      <StyledWeather>
        <Typography>Weather data currently unavailable</Typography>
      </StyledWeather>
    );

  // NOTE: Need to add city
  return (
    <StyledWeather>
      <img
        alt="weather-icon"
        src={`https://openweathermap.org/img/wn/${data?.weather?.[0].icon}.png`}
      />
      <p>{`${Math.round(data?.main?.temp)}\xB0, ${data?.weather?.[0].description}`}</p>
    </StyledWeather>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledWeather = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
  gap: 1.5em;
  padding: 1em 0em 0em 0em;
  img {
    width: 50px;
    height: 50px;
  }
`;
