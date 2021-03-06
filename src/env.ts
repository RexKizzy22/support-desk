import "dotenv/config";
// "heroku:postbuild": "NPM_CONFIG_PRODUCTION=false cd client && pnpm install && pnpm build",

export const MONGO_URI = process.env.MONGO_URI,
  JET_LOGGER_FILEPATH = process.env.JET_LOGGER_FILEPATH,
  JET_LOGGER_TIMESTAMP = process.env.JET_LOGGER_TIMESTAMP,
  JET_LOGGER_FORMAT = process.env.JET_LOGGER_FORMAT,
  JET_LOGGER_MODE =
    process.env.NODE_ENV === "production"
      ? process.env.JET_LOGGER_MODE_PROD
      : process.env.JET_LOGGER_MODE_LOCAL,
  NODE_ENV = process.env.NODE_ENV || 'development'
