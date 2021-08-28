import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const imageValidation = yup
  .mixed()
  //.required("An image should be provided")
  .test("fileSize", "File must be under 2MB in size", value => {
    return value && value[0].size <= 2000000;
  })
  .test("type", "We only support jpeg and png", value => {
    return value && value[0].type === ("image/jpeg" || "image/png");
  });

const addSeedSchema = yup.object().shape({
  seedImage: imageValidation,
  Height: yup
    .number()
    .min(0)
    .required("Required as numerical value e.g. 12, use 0 if not sprouted!")
    .typeError("A Number greater than 0 is required"),
  StemLength: yup
    .number()
    .min(0)
    .required("Required as numerical value e.g. 12, use 0 if not sprouted!")
    .typeError("A Number greater then 0 is required"),
  LeafWidth: yup
    .number()
    .min(0)
    .required("Reqired as numerical value e.g. 12 (use 0 if no leaves)")
    .typeError("A Number greater then 0 is required"),
  LeafColour: yup
    .string()
    .required("Required as string, please put none if no leaves")
    .typeError("Please use a color e.g 'green' to describe"),
  LeafCount: yup.number().min(0).typeError("A Number greater or equal to 0"),
  LeafLength: yup.number().min(0).typeError("A Number greater or equal to 0"),
  PhLevel: yup.number().min(0).max(14).typeError("A Number between 0 and 14"),
  Temperature: yup.number().min(-10).max(40).typeError("A Number between -10 and 40"),
  WaterVolume: yup.number().min(0).max(1000).typeError("A Number between 0 and 1000"),
  Notes: yup.string(),
});

const addSeedResolver = yupResolver(addSeedSchema);

export default addSeedResolver;
