// import "./pre-start"; // Must be the first import
import logger from "jet-logger";
import app from "./server";
import connectDB from "./config/db";

// Constants
const serverStartMsg = "Express server started on port: ",
  port = process.env.PORT || 4005;

// Database Connection
connectDB()
  .then(() => {
    // Start server
    app.listen(port, () => {
      logger.info(serverStartMsg + port);
    });
  })
  .catch(() => logger.err("Unable to connect to database"));
