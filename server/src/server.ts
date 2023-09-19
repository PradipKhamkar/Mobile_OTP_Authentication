// .env file configuration
import { config } from "dotenv";
config({ path: "./server/.env" });
import express, { Application, Response, Request } from "express";

import configDb from "./config/connection";
import userRoutes from "./routes/userRoute";

// creating express application instance
const app: Application = express();

const PORT: any = process.env.PORT || 2000;

// connecting DB
configDb();

app.use(express.json());

//LOAD route
app.use("/api/user", userRoutes);

// development server
app.listen(PORT, "localhost", () => {
  console.log(`🚀 server running on ${PORT}`);
});
