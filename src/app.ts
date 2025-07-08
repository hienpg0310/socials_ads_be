import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { setUpAppRoutes } from "./routes";
import { appConfig } from "./utils/config";

const port = parseInt(appConfig.port);

const startApp = (port: number) => {
  var cors = require("cors");

  const app = express();

  app.use(logger("dev"));
  app.use(express.json());
  // app.use(cors());
  app.use(
    cors({
      origin: "*", // or restrict to your FE domain
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.options("*", cors()); // handle OPTIONS preflight

  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  app.get("/", (req, res) => {
    res.send("<h1>Ad Management</h1>");
  });
  app.use("/", setUpAppRoutes());

  app.listen(port, function () {
    console.info(`Server is started on port ${port}`);
  });
};

// call start app
startApp(port);
