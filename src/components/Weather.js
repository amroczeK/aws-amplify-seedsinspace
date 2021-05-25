import React, { useState, useEffect } from "react";

import { format } from "date-fns";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { StyledTypographyDark } from "../components/styled-components/Typography";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import LinearProgress from "@material-ui/core/LinearProgress";

import styled from "styled-components";
import { Typography } from "@material-ui/core";

const queryClient = new QueryClient();

const WeatherApp = () => {
  const date = new Date();

  return (
    <Card>
      <CardContent>
        <StyledTypographyDark variant="h6">
          {format(date, "eeee dd MMMM")}
        </StyledTypographyDark>
        <QueryClientProvider client={queryClient}>
          <Weather />
        </QueryClientProvider>
      </CardContent>
    </Card>
  );
};

export default WeatherApp;

const Weather = () => {
  const [location, setLocation] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    });
  }, []);

  const { isLoading, error, data } = useQuery(
    "weatherData",
    () =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.long}&units=metric&APPID=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}`
      ).then((res) => res.json()),
    { enabled: "lat" in location && "long" in location }
  );

  if (isLoading) return <LinearProgress />;

  if (error)
    return (
      <StyledWeather>
        <Typography>Weather data currently unavailable</Typography>
      </StyledWeather>
    );

  if (data)
    return (
      <StyledWeather>
        <img
          alt="weather-icon"
          src={`https://openweathermap.org/img/wn/${data?.weather?.[0].icon}.png`}
        />
        {`${Math.round(data?.main?.temp)}\xB0, ${
          data?.weather?.[0].description
        }`}
      </StyledWeather>
    );

  return <LinearProgress />;
};

const StyledWeather = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5em;
  padding: 1em 0em 0em 0em;
`;
