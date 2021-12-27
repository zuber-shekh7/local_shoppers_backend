import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";

import coreRoutes from "./src/routes/coreRoutes.js";

// initialization
const app = express();
dotenv.config();

// middlewares
app.use(express.json());
app.use(cors());

// constants
const HOST = process.env.HOST;
const PORT = process.env.PORT || 4000;
const NODE_ENV = process.env.NODE_ENV;

// routes
app.use("/api", coreRoutes);

// listen
app.listen(PORT, () => {
  console.log(
    `Server is running in ${NODE_ENV} mode on ${HOST}:${PORT}`.blue.bold
  );
});
