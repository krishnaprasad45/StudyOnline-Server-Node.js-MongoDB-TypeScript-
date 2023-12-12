"use strict";
// app.js
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const mongo_1 = __importDefault(require("../frameworks/database/mongo"));
const userRoute_1 = __importDefault(require("../frameworks/express/routes/userRoute"));
const mentorRoute_1 = __importDefault(require("../frameworks/express/routes/mentorRoute"));
const adminRoute_1 = __importDefault(require("../frameworks/express/routes/adminRoute"));
const debug = require("debug")("myapp:server");
const app = (0, express_1.default)();
const port = 5000;
// Connect to MongoDB
(0, mongo_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/public/images", express_1.default.static("public/images"));
const allowedOrigins = ["http://localhost:5173"];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
console.log("server-index.ts");
// Routes
app.use("/", userRoute_1.default);
app.use("/mentor", mentorRoute_1.default);
app.use("/admin", adminRoute_1.default);
app.get("/", (req, res) => {
    res.send().status(200);
});
app.listen(port, () => {
    debug(`Server is running on http://localhost:${port}`);
});
