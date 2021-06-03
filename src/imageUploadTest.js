import styled from "styled-components";
import ImageUpload from "./components/ImageUpload";
import { useForm } from "react-hook-form";

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 70px);
  justify-content: center;
  align-items: center;
`;

const GridForm = styled.form`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  justify-items: center;
`;

const ImageUploadTest = () => {
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <GridContainer>
      <GridForm onSubmit={handleSubmit(onSubmit)}>
        <ImageUpload
          preview={true}
          register={register}
          setValue={setValue}
          name="seed-image"
        />
        <button type="submit">SUBMIT</button>
      </GridForm>
    </GridContainer>
  );
};

export default ImageUploadTest;
