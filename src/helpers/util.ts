export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
};

export const buildErrorMessage = (
  msg = "Something went wrong"
) => ({
  message: msg,
});
