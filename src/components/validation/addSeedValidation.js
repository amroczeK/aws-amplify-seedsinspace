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
    .required("Required field. Enter a number or use 0 if not sprouted.")
    .typeError("Required field. Enter a number or use 0 if not sprouted."),
  StemLength: yup
    .number()
    .min(0)
    .required("Required field. Enter a number or use 0 if not sprouted.")
    .typeError("Required field. Enter a number or use 0 if not sprouted."),
  LeafWidth: yup
    .number()
    .min(0)
    .required("Required field. Enter a number or use 0 if no leaves. ")
    .typeError("Required field. Enter a number or use 0 if no leaves."),
  LeafColour: yup
    .string()
    .matches(/^[a-zA-Z\s]*$/, "Required field. Describe the colour or put “none” if no leaves. ")
    .required(),
  LeafCount: yup.lazy(value =>
    value === "" ? yup.string() : yup.number().min(0).typeError("Required field. Enter a number or use 0 if no leaves.")
  ),
  LeafLength: yup.lazy(value =>
    value === "" ? yup.string() : yup.number().min(0).typeError("Required field. Enter a number or use 0 if no leaves.")
  ),
  PhLevel: yup.lazy(value =>
    value === "" ? yup.string() : yup.number().min(0).max(14).typeError("Required field. Enter a number between 0 and 14.")
  ),
  Temperature: yup.lazy(value =>
    value === "" ? yup.string() : yup.number().min(-30).max(40).typeError("Required field. Enter a number between -30 and 40.")
  ),
  WaterVolume: yup.lazy(value =>
    value === "" ? yup.string() : yup.number().min(0).max(1000).typeError("Required field. Enter a number between 0 and 1000.")
  ),
  Notes: yup.string(),
});

const addSeedResolver = yupResolver(addSeedSchema);

export default addSeedResolver;
