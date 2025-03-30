import * as yup from "yup";

export const columnValidator = yup.object({
  name: yup
    .string()
    .required("Название колонки обязательно")
    .min(3, "Название должно быть не менее 3 символов")
    .max(50, "Название должно быть не более 50 символов"),
  isFinished: yup.boolean().required(),
});
