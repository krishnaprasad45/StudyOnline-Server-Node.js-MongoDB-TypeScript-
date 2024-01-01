"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const jwtTokenAuth_1 = require("../frameworks/express/middlewares/jwtTokenAuth");
const debug = require("debug")("myapp:server");
const dotenv_1 = __importDefault(require("dotenv"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const app = (0, express_1.default)();
const port = 5000;
(0, mongo_1.default)();
dotenv_1.default.config();
// Middleware
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/public/images", express_1.default.static("public/images"));
//CROSS ORIGIN RESOURCE SHARING
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
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: `http://localhost:5173`,
        methods: ["GET", "POST"],
        credentials: true,
    },
    transports: ["websocket", "polling"],
    allowEIO3: true,
});
// Role Based Authentication
app.use(jwtTokenAuth_1.validateRole);
// Routes
app.use("/", userRoute_1.default);
app.use("/mentor", mentorRoute_1.default);
app.use("/admin", adminRoute_1.default);
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    socket.on("test", (data) => {
        console.log(data);
    });
}));
io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
    socket.on("SentMessage", (data) => {
        // console.log(data.text);
        // console.log(data.name);
        io.to(data.to).emit('ReceiveMessage', { from: data.to });
    });
}));
app.get("/", (req, res) => {
    res.send().status(200);
});
httpServer.listen(port, () => {
    debug(`Server is running on http://localhost:${port}`);
});
