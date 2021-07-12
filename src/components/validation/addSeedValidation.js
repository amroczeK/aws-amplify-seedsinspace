import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const heightMsg = "Please add a height for your seed using a numerical value e.g. 12";
const stemLengthMsg =
  "Please add a stem length for your seed using a numerical value e.g. 12";
const leafSizeMsg =
  "Please add the leaf size for your seed using a numerical value e.g. 12 (use 0 if no leaves)";
const leafColorMsg =
  "Please indicate the current color of your leaves, if there are no leaves please use none";
const notesMsg = "Please add notes to describe the current status of your seeds";

const imageValidation = yup
  .mixed()
  .required("An image should be provided")
  .test("fileSize", "File must be under 2MB in size", value => {
    return value && value[0].size <= 2000000;
  })
  .test("type", "We only support jpeg", value => {
    return value && value[0].type === "image/jpeg";
  });

const addSeedSchema = yup.object().shape({
  seedImage: imageValidation,
  Height: yup.number().required(heightMsg),
  StemLength: yup.number().required(stemLengthMsg),
  LeafWidth: yup.number().required(leafSizeMsg),
  LeafColour: yup.string().required(leafColorMsg),
  LeafCount: yup.string(),
  LeafLength: yup.string(),
  PhLevel: yup.number().test("PH Test", "PH Must be between 0 and 14", value => {
    return value >= 0 && value <= 14;
  }),
  Temperature: yup.number().test("Temperature Test", "Temperature innacurate", value => {
    return value > -6 && value <= 50;
  }),
  WaterVolume: yup.number(),
  Notes: yup.string().required(notesMsg),
});

const addSeedResolver = yupResolver(addSeedSchema);

export default addSeedResolver;
