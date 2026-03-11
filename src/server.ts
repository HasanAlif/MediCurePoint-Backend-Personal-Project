import { Server } from "http";
import config from "./config/index.js";
import app from "./app.js";

let server: Server;

async function startServer() {
  server = app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
  });
}

async function main() {
  await startServer();

  const exitHandler = (code: number) => {
    if (server) {
      server.close(() => {
        console.info("Server closed!");
        process.exit(code);
      });
    } else {
      process.exit(code);
    }
  };

  process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    exitHandler(1);
  });

  process.on("unhandledRejection", (error) => {
    console.error("Unhandled Rejection:", error);
    exitHandler(1);
  });

  process.on("SIGTERM", () => {
    console.info("SIGTERM received");
    exitHandler(0);
  });

  process.on("SIGINT", () => {
    console.info("SIGINT received");
    exitHandler(0);
  });
}

main();
