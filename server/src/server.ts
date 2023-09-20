// .env file configuration
import { config } from "dotenv";
config({ path: "./server/.env" });
import express, { Application, Response, Request } from "express";
import cookiesParser from "cookie-parser";
import expressFileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import path from "path";
import configDb from "./config/connection";
import userRoutes from "./routes/userRoute";

// creating express application instance
const app: Application = express();

const PORT: any = process.env.PORT || 2000;

// connecting DB
configDb();

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(cookiesParser());
app.use(expressFileUpload());

//LOAD route
app.use("/api/user", userRoutes);

//cloudnary configuration for saving profile image on cloud
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET_KEY,
});

// development server
app.listen(PORT, "localhost", () => {
  console.log(`🚀 server running on ${PORT}`);
});

//Acessing Front End Stactic Files
app.use(express.static(path.join(__dirname, "../client/build")));

//Acessing Front End All URL
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});
