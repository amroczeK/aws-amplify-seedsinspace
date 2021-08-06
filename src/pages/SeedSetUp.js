import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import styled from "styled-components";
import { StyledLink } from "../components/styled-components/Links";
import { TextField } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { StyledInputLabel } from "../components/styled-components/InputLabel";
import { useAws } from "../context/AWSContext";
import { ControlledPicker } from "../components/MaterialUIPicker";
import { useHistory } from "react-router-dom";
import { updateSchool } from "../apis";
import { seedSetupResolver } from "../components/validation/schemas";
import Alert from "@material-ui/lab/Alert";

const SeedSetUp = () => {
  const history = useHistory();
  const [step, setStep] = useState(0);
  const [setUpError, setSetUpError] = useState(null);
  const [signedURL, setSignedURL] = useState(null);
  const { control, handleSubmit, formState } = useForm({ resolver: seedSetupResolver });
  const { cognitoUser, fetchS3 } = useAws();
  const { errors } = formState;

  useEffect(() => {
    const getGuide = async () => {
      const url = await fetchS3({
        path: "documents/Seeds_in_Space_Guidebook.pdf",
        level: "public",
      });
      setSignedURL(url);
    };
    getGuide();
  }, [fetchS3]);

  const stepContent = () => {
    return {
      0: <SeedsPlantedQuery />,
      1: <SeedsNotPlanted />,
      2: <SeedsPlanted />,
    }[step];
  };

  const confirmSeedSetup = async formData => {
    // update Database
    try {
      await updateSchool(
        {
          SchoolName: cognitoUser.attributes["custom:organisation"],
          Address: cognitoUser.attributes["address"],
          Environment: formData.environment,
          Planting_Date: formData.date,
        },
        cognitoUser?.username
      );

      // redirect to dashboard/home
      history.push("/");
    } catch (error) {
      console.log(error);
      setSetUpError(error);
    }
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
        <GridForm onSubmit={handleSubmit(confirmSeedSetup)}>
          <StyledInputLabel shrink>WHEN DID YOU PLANT YOUR SEEDS?</StyledInputLabel>
          <ControlledPicker name="date" control={control} errors={errors} />
          <StyledInputLabel shrink>
            WHAT TYPE OF ENVIRONMENT ARE THE SEEDS GROWING IN?
          </StyledInputLabel>
          <Controller
            name="environment"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                multiline
                variant="outlined"
                error={errors?.environment ? true : false}
                helperText={errors?.environment?.message}
                rows={10}
              />
            )}
          />
          {setUpError && <Alert severity="error">{setUpError.message}</Alert>}
          <StyledButton
            color="primary"
            type="submit"
            disableElevation
            variant="contained"
          >
            Save
          </StyledButton>
        </GridForm>
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

const GridForm = styled.form`
  display: grid;
  gap: 1em;
`;
