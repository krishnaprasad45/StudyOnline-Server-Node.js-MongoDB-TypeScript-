// app.js

import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "../frameworks/database/mongo";
import userRoute from "../frameworks/express/routes/userRoute";
import mentorRoute from "../frameworks/express/routes/mentorRoute";
import adminRoute from "../frameworks/express/routes/adminRoute";
const debug = require("debug")("myapp:server");

const app = express();
const port = 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/public/images", express.static("public/images"));

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
console.log("server-index.ts")
// Routes
app.use("/", userRoute);
app.use("/mentor", mentorRoute);
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  res.send().status(200);
});

app.listen(port, () => {
  debug(`Server is running on http://localhost:${port}`);
});