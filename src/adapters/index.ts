import express from "express";
import cookieParser from "cookie-parser";
import cors, { CorsOptions } from "cors";
import connectDB from "../frameworks/database/mongo";
import userRoute from "../frameworks/express/routes/userRoute";
import mentorRoute from "../frameworks/express/routes/mentorRoute";
import adminRoute from "../frameworks/express/routes/adminRoute";
import { validateRole } from "../frameworks/express/middlewares/jwtTokenAuth";
const debug = require("debug")("myapp:server");
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import chatUseCase from "../business/usecases/chat-useCase/chat-useCase";
import socketManager from "../frameworks/socket-io/socket-io";
import message from "../business/interfaces/chatInterface";
const app = express();

connectDB();
dotenv.config();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public/images", express.static("public/images"));


//CROSS ORIGIN RESOURCE SHARING
const allowedOrigins = [
  "http://localhost:5173",
  "https://react-study-online.vercel.app",
];

const corsOptions: CorsOptions = {
	origin(requestOrigin, callback) {
		if (!requestOrigin || allowedOrigins.includes(requestOrigin)) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
	optionsSuccessStatus: 200, 
	credentials: true,
	preflightContinue: true,
	allowedHeaders: [
		"Accept",
		"Accept-Language",
		"Content-Language",
		"Content-Type",
		"Authorization",
		"Access-Control-Allow-Origin",
	],
}

app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: corsOptions,
  transports: ["websocket", "polling"],
  allowEIO3: true,
});

// Role Based Authentication
app.use(validateRole);
// Routes
app.use("/", userRoute);
app.use("/mentor", mentorRoute);
app.use("/admin", adminRoute);

io.on("connection", async (socket: Socket) => {
  socket.on("test", (data: string) => {
  });
});
io.on("connection", async (socket: Socket) => {
  socket.on(
    "SentMessage",async (data: message) => {
      const result = await chatUseCase.saveChat(data)
      io.emit("SentUpdatedMessage", result);
    }
  );

});

app.get("/", (req, res) => {
  res.send().status(200);
});

const {PORT, HOST} = process.env;



app.listen(PORT, () => console.log(`server started at http://localhost${PORT}`))

socketManager(io);
