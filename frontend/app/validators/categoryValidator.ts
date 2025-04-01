import * as yup from "yup";

export const categoryValidator = yup.object().shape({
  name: yup.string().required("Название категории обязательно").min(2, "Название должно быть не менее 2 символов").max(20, "Название должно быть не более 20 символов"),
});