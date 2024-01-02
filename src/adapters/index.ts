import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "../frameworks/database/mongo";
import userRoute from "../frameworks/express/routes/userRoute";
import mentorRoute from "../frameworks/express/routes/mentorRoute";
import adminRoute from "../frameworks/express/routes/adminRoute";
import { validateRole } from "../frameworks/express/middlewares/jwtTokenAuth";
const debug = require("debug")("myapp:server");
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";
import { createServer } from "http";

const app = express();
const port = 5000;

connectDB();
dotenv.config();
// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public/images", express.static("public/images"));

//CROSS ORIGIN RESOURCE SHARING
const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: `http://localhost:5173`,
    methods: ["GET", "POST"],
    credentials: true,
  },
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
    console.log(data);
  });
});
io.on("connection", async (socket: Socket) => {
  
  socket.on("SentMessage", (data: {message:string,to:string,from:string,id:number}) => {
    console.log(data.from);
    console.log(data.message);
    console.log(data.to);
    console.log(data.id);
    // io.to(data.to).emit('ReceiveMessage',{from:data.to})
    io.emit('SentMessage',data)

  });
});

app.get("/", (req, res) => {
  res.send().status(200);
});

httpServer.listen(port, () => {
  debug(`Server is running on http://localhost:${port}`);
});
