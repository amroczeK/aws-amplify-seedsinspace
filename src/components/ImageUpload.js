import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import NoImage from "../assets/SeedlingsPreviewImage.jpg";
import { Camera } from "@styled-icons/bootstrap/Camera";

const StyledButton = styled(Button)`
  color: ${props => props.color || props.theme.palette.primary.main};
  text-transform: ${props => props.textTransform || "none"};
  margin-left: 1em;
  padding: 0;
`;

const Image = styled.img`
  max-width: 350px;
  width: 100%;
  height: auto;
  padding: 10px;
  border: 1px solid #358c5f;
  align-self: center;
  justify-self: center;
`;

// const ImageText = styled.p`
//   font-size: 12px;
// `;

const CameraIcon = styled(Camera)`
  width: 2em;
  height: 2em;
  color: ${props => props.color || props.theme.palette.primary.main};
  margin: 1em 0;
`;

const ImageUpload = ({ name, image, text, setValue, formValue, error }) => {
  const [imageUrl, setImageUrl] = useState(null);
  // const [imageFileName, setImageFileName] = useState("None");

  useEffect(() => {
    if (!formValue) {
      setImageUrl(null);
      // setImageFileName("None");
    }
  }, [formValue]);

  const onImageUpload = ({ target }) => {
    const imageFiles = target.files;

    if (imageFiles[0]) {
      const preview = URL.createObjectURL(imageFiles[0]);
      setImageUrl(preview);
      // setImageFileName(imageFiles[0].name);
      setValue(name, imageFiles, { shouldValidate: true }); // updated react hook form
    }
  };

  return (
    <>
      <Image
        src={imageUrl || image || NoImage}
        alt="seed image"
        onError={() => setImageUrl(NoImage)}
      />
      <div>
        <CameraIcon />
        <StyledButton component="label">
          + {text || "Update profile picture"}
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            hidden
            onChange={e => onImageUpload(e)}
          />
        </StyledButton>
        {error && <p style={{ color: "red" }}>{error.message}</p>}
        {/* <ImageText>{`Image: ${imageFileName || "None"}`}</ImageText> */}
      </div>
    </>
  );
};

export default ImageUpload;
