import { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { Camera } from "@styled-icons/bootstrap/Camera";

const StyledButton = styled(Button)`
  color: ${props => props.color || props.theme.primaryBackground};
  text-transform: ${props => props.textTransform || "none"};
  margin-left: 1em;
  padding: 0;
`;

const Image = styled.img`
  max-width: 350px;
  height: auto;
  padding: 10px;
  border: 1px solid #358c5f;
`;

const CameraIcon = styled(Camera)`
  width: 2em;
  height: 2em;
  color: ${props => props.color || props.theme.primaryBackground};
  margin: 1em 0;
`;

const ImageUpload = ({ preview, register, name, setValue }) => {
  const [imagePreview, setImagePreview] = useState();

  register(name); // register the field with react hook form

  const handleUpload = e => {
    const imageFiles = e.target.files;
    if (imageFiles[0]) {
      const preview = URL.createObjectURL(imageFiles[0]);
      setImagePreview(preview);
      setValue(name, imageFiles); // updated react hook form
    }
  };

  return (
    <>
      {preview && <Image src={imagePreview || null} alt="None" />}
      <div>
        <CameraIcon />
        <StyledButton component="label">
          + Add your logo
          <input
            onChange={e => handleUpload(e)}
            hidden
            id="image-upload"
            type="file"
            accept="image/*"
          />
        </StyledButton>
      </div>
    </>
  );
};

export default ImageUpload;
