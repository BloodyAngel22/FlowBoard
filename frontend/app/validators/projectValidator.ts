import * as yup from "yup";

export const projectValidator = yup.object().shape({
  name: yup
    .string()
    .required("Название проекта обязательно")
    .min(3, "Название должно быть не менее 3 символов")
    .max(50, "Название должно быть не более 50 символов"),
  description: yup
    .string()
    .nullable()
    .when({
      is: (value: string) => value && value.length > 0,
      then: (schema) =>
        schema
          .min(2, "Описание должно быть не менее 2 символов")
          .max(100, "Описание должно быть не более 100 символов"),
      otherwise: (schema) => schema.optional(),
    }),
});