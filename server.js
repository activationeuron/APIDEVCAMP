const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const errorHandlers = require("./middleware/errorHandler");
dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(express.json());
app.use(cookieParser());

const bootcamps = require("./routes/bootcamp");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
connectDB();

if (process.env.NODE_ENV === "undefined") {
  app.use(morgan("dev"));
}
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);

app.use(errorHandlers);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  // @ts-ignore
  console.log(`SERVER RUNNING in ${process.env.NODE_ENV} made in ${PORT}`)
);

// handle unhandle prommis rejection
process.on("unhandledRejection", (err, prommis) => {
  console.log(`ERROR: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});

// /update and delete course
