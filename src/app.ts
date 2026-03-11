import express, { Application, Request, Response } from "express";
import httpStatus from "http-status";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config/index.js";
import GlobalErrorHandler from "./app/middlewares/globalErrorHandler.js";
import router from "./app/routes/index.js";
import { LANDING_PAGE_TEMPLATE } from "./utils/Template.js";

const app: Application = express();

export const corsOptions = {
  origin: config.cors_origins,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req: Request, res: Response) => {
  res.send(LANDING_PAGE_TEMPLATE);
});

app.use("/api", router);

app.use(GlobalErrorHandler);

app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND!",
    errorSources: [
      {
        path: req.originalUrl,
        message: "The requested API route does not exist",
      },
    ],
  });
});

export default app;
