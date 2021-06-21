import { useState, useContext } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import DefaultImage from "../assets/SeedlingsPreviewImage.jpg";
import { Camera } from "@styled-icons/bootstrap/Camera";
import { S3BucketContext } from "../components/context/S3Bucket";

const StyledButton = styled(Button)`
  color: ${props => props.color || props.theme.palette.primary.main};
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

const ImageText = styled.p`
  font-size: 12px;
`;

const CameraIcon = styled(Camera)`
  width: 2em;
  height: 2em;
  color: ${props => props.color || props.theme.palette.primary.main};
  margin: 1em 0;
`;

const ImageUpload = ({
  preview = true,
  register,
  setValue,
  name,
  path,
  level,
  setError,
}) => {
  const [imageUrl, setImageUrl] = useState();
  const [imageFile, setImageFile] = useState("None");

  const { uploadImage } = useContext(S3BucketContext);

  register(name); // register the field with react hook form

  const handleUpload = async e => {
    const imageFiles = e.target.files;
    if (imageFiles[0]) {
      const preview = URL.createObjectURL(imageFiles[0]);
      setImageUrl(preview);
      setImageFile(imageFiles[0]);
      setValue(name, imageFiles); // updated react hook form
      try {
        await uploadImage({
          file: imageFiles[0],
          path,
          level,
        });
      } catch (error) {
        console.log(error);
        //setError(error)
      }
    }
  };

  return (
    <>
      {preview && <Image src={imageUrl || DefaultImage} alt="seed image" />}
      <div>
        <CameraIcon />
        <StyledButton component="label">
          + Add your logo
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            hidden
            onChange={e => handleUpload(e)}
          />
        </StyledButton>
        <ImageText>{`Image: ${imageFile.name || "None"}`}</ImageText>
      </div>
    </>
  );
};

export default ImageUpload;
