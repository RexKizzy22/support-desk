import "dotenv/config";

export const MONGO_URI = process.env.MONGO_URI;
export const JET_LOGGER_FILEPATH = process.env.JET_LOGGER_FILEPATH;
export const JET_LOGGER_TIMESTAMP = process.env.JET_LOGGER_TIMESTAMP;
export const JET_LOGGER_FORMAT = process.env.JET_LOGGER_FORMAT;
export const JET_LOGGER_MODE =
  process.env.NODE_ENV === "production"
    ? process.env.JET_LOGGER_MODE_PROD
    : process.env.JET_LOGGER_MODE_LOCAL;
