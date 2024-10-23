import zod from "zod";

export const getZodErrors = (error: any) => {
  const isZodError = error instanceof zod.ZodError;
  if (!isZodError) return null;

  const { fieldErrors } = error.flatten();

  const errors = Object.keys(fieldErrors).reduce((acc, key) => {
    const message = fieldErrors[key]?.at(0);
    return { ...acc, [key]: message };
  }, {});

  return errors;
};
