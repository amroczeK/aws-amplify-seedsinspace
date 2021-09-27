import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const imageValidation = yup
  .mixed()
  .test("fileSize", "File must be under 2MB in size", (value, testContext) => {
    if (testContext.originalValue) {
      return value && value[0].size <= 2000000;
    }
    return true;
  })
  .test("type", "We only support jpeg and png", (value, testContext) => {
    if (testContext.originalValue) {
      return value && value[0].type === ("image/jpeg" || "image/png");
    }
    return true;
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
    .matches(/^[a-zA-Z\s]*$/, "Only letters are supported")
    .required(),
  LeafCount: yup.lazy(value =>
    value === ""
      ? yup.string()
      : yup.number().min(0).typeError("A Number greater or equal to 0")
  ),
  LeafLength: yup.lazy(value =>
    value === ""
      ? yup.string()
      : yup.number().min(0).typeError("A Number greater or equal to 0")
  ),
  PhLevel: yup.lazy(value =>
    value === ""
      ? yup.string()
      : yup.number().min(0).max(14).typeError("A Number between 0 and 14")
  ),
  Temperature: yup.lazy(value =>
    value === ""
      ? yup.string()
      : yup.number().min(-10).max(40).typeError("A Number between -10 and 40")
  ),
  WaterVolume: yup.lazy(value =>
    value === ""
      ? yup.string()
      : yup.number().min(0).max(1000).typeError("A Number between 0 and 1000")
  ),
  Notes: yup.string(),
});

const addSeedResolver = yupResolver(addSeedSchema);

export default addSeedResolver;
