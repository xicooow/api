export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const buildErrorMessage = (
  msg = "Something went wrong"
) => ({
  message: msg,
});

export const validBody = (body: any) => {
  return body && typeof body === "object";
};

export const isObject = (value: any) => {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
};
