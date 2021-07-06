import { useState } from "react";
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

const ImageText = styled.p`
  font-size: 12px;
`;

const CameraIcon = styled(Camera)`
  width: 2em;
  height: 2em;
  color: ${props => props.color || props.theme.palette.primary.main};
  margin: 1em 0;
`;

const ImageUpload = ({ preview = true, setValue, name, image, error, text }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState("None");

  const handleUpload = async e => {
    const imageFiles = e.target.files;
    if (imageFiles[0]) {
      const preview = URL.createObjectURL(imageFiles[0]);
      setImageUrl(preview);
      setImageFile(imageFiles[0]);
      setValue(name, imageFiles); // updated react hook form
    }
  };

  return (
    <>
      {preview && (
        <Image
          src={imageUrl || image || NoImage}
          alt="seed image"
          onError={() => setImageUrl(NoImage)}
        />
      )}
      <div>
        <CameraIcon />
        <StyledButton component="label">
          + {text || "add your image"}
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            hidden
            onChange={e => handleUpload(e)}
          />
        </StyledButton>
        {error && <p style={{ color: "red" }}>{error.message}</p>}
        <ImageText>{`Image: ${imageFile.name || "None"}`}</ImageText>
      </div>
    </>
  );
};

export default ImageUpload;
