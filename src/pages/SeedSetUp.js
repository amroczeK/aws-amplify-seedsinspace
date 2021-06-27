import React, { useState, useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import styled from "styled-components";
import { StyledLink } from "../components/styled-components/Links";
import { TextField, InputAdornment, Link } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { StyledInputLabel } from "../components/styled-components/InputLabel";
import { Calendar3 } from "@styled-icons/bootstrap/Calendar3";
import { S3BucketContext } from "../context/S3Bucket";

const SeedSetUp = () => {
  const [step, setStep] = useState(0);
  const [signedURL, setSignedURL] = useState(null);
  const { control, register, setValue, handleSubmit } = useForm();
  const { fetchFile } = useContext(S3BucketContext);

  useEffect(() => {
    const getFile = async () => {
      console.log("hello");
      const url = await fetchFile("SeedsInSpaceSeedSetup.pdf", "public");
      console.log(url);
      setSignedURL(url);
    };
    getFile();
  }, []);

  const stepContent = () => {
    return {
      0: <SeedsPlantedQuery />,
      1: <SeedsNotPlanted />,
      2: <SeedsPlanted />,
    }[step];
  };

  // Note: Should probably be a separate section
  const SeedsPlantedQuery = () => {
    return (
      <SeedSetUpContainer>
        <Typography variant="h5">Have you planted your seeds?</Typography>
        <StyledButtonContainer>
          <StyledButton
            color="primary"
            disableElevation
            variant="contained"
            onClick={() => setStep(2)}
          >
            Yes
          </StyledButton>

          <StyledButtonLight
            disableElevation
            variant="contained"
            onClick={() => setStep(1)}
          >
            No
          </StyledButtonLight>
        </StyledButtonContainer>
        <StyledLink to={{ pathname: signedURL }} target="_blank">
          Need help planting the seeds?
        </StyledLink>
      </SeedSetUpContainer>
    );
  };

  const SeedsNotPlanted = () => {
    return (
      <SeedSetUpContainer>
        <Card>
          <CardContent>
            <Typography variant="body2">
              You won't be able to enter seed data until you've confirmed that you've
              planted your seeds.
            </Typography>
          </CardContent>
        </Card>
        <StyledButton
          color="primary"
          disableElevation
          variant="contained"
          onClick={() => setStep(2)}
        >
          I have planted my seeds
        </StyledButton>
        <StyledLink to={{ pathname: signedURL }} target="_blank">
          Need help planting the seeds?
        </StyledLink>
      </SeedSetUpContainer>
    );
  };

  const SeedsPlanted = () => {
    return (
      <SeedSetUpContainer>
        <StyledInputLabel shrink>WHEN DID YOU PLANT YOUR SEEDS?</StyledInputLabel>
        <Controller
          name="seedPlanted"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <StyledCalendarIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <StyledInputLabel shrink>
          WHAT TYPE OF ENVIRONMENT ARE THE SEEDS GROWING IN?
        </StyledInputLabel>
        <Controller
          name="environment"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField {...field} multiline variant="outlined" rows={10} />
          )}
        />
        <StyledButton color="primary" type="submit" disableElevation variant="contained">
          Save
        </StyledButton>
      </SeedSetUpContainer>
    );
  };

  return <Container>{stepContent()}</Container>;
};

export default SeedSetUp;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
`;

const SeedSetUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
  max-width: 350px;
  margin: 2em 1em 1em 1em;
  padding: 1em;
  gap: 1em;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 1em;
`;

const StyledButton = styled(Button)`
  background: ${({ theme }) => theme.secondaryLight};
  color: ${({ theme }) => theme.primaryLight};
  padding: 1em 0;
  width: 100%;
  text-transform: none;
`;

const StyledButtonLight = styled(Button)`
  background: ${({ theme }) => theme.primaryHover};
  color: ${({ theme }) => theme.primaryLight};
  padding: 1em 0;
  width: 100%;
  text-transform: none;
`;

const StyledCalendarIcon = styled(Calendar3)`
  width: 1.5em;
  height: 1.5em;
`;
