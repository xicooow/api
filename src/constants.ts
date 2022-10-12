export const ENTRYPOINT = "/api";
export const APP_PORT = process.env.PORT || 5000;
export const APP_DB_URL =
  process.env.DB_URL || "mongodb://localhost:27017";
export const EMAIL_REGEX = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
