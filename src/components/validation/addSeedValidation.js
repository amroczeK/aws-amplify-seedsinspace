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

const addSeedSchema = yup.object().shape({
  image: yup.string().required("An image should be provided"),
  Height: yup.number().required(heightMsg),
  StemLength: yup.number().required(stemLengthMsg),
  LeafWidth: yup.number().required(leafSizeMsg),
  LeafColour: yup.string().required(leafColorMsg),
  Notes: yup.string().required(notesMsg),
});

const addSeedResolver = yupResolver(addSeedSchema);

export default addSeedResolver;
