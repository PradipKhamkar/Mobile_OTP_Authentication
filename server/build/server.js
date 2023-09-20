"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// .env file configuration
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: "./server/.env" });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const path_1 = __importDefault(require("path"));
const connection_1 = __importDefault(require("./config/connection"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
// creating express application instance
const app = (0, express_1.default)();
const PORT = process.env.PORT || 2000;
// connecting DB
(0, connection_1.default)();
app.use(express_1.default.json({
    limit: "50mb",
}));
app.use((0, cookie_parser_1.default)());
app.use((0, express_fileupload_1.default)());
//LOAD route
app.use("/api/user", userRoute_1.default);
//cloudnary configuration for saving profile image on cloud
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET_KEY,
});
// development server
app.listen(PORT, "localhost", () => {
    console.log(`🚀 server running on ${PORT}`);
});
//Acessing Front End Stactic Files
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/build")));
//Acessing Front End All URL
app.get("/*", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "../../client/build/index.html"));
});
