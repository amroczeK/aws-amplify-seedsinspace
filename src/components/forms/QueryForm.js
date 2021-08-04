import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import DateRangeSelect from "../inputs/DateRangeSelect";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";

const QueryForm = () => {
  const { control, handleSubmit, formState } = useForm({});
  const { errors } = formState;
  return (
    <Container>
      <GridForm onSubmit={handleSubmit(data => console.log("submitted", data))}>
        <Controller
          name="daterange"
          defaultValue=""
          control={control}
          render={({ field }) => <DateRangeSelect {...field} />}
        />
        <button color="primary" type="submit" variant="contained">
          Login
        </button>
      </GridForm>
    </Container>
  );
};

export default QueryForm;

const Container = styled.div`
  display: flex;
`;

const GridForm = styled.form`
  //display: grid;
  gap: 1em;
  min-width: 350px;
  margin: 1em 0;
`;
