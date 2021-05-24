import React from "react";

import { format } from "date-fns";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { StyledTypographyDark } from "../components/styled-components/Typography";

const Weather = () => {
  const date = new Date();

  return (
    <Card>
      <CardContent>
        <StyledTypographyDark variant="h6">
          {format(date, "eeee dd MMMM")}
        </StyledTypographyDark>
      </CardContent>
    </Card>
  );
};

export default Weather;
