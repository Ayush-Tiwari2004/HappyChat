const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDb = require('./config/db');
const authRouter = require('./routes/authRoutes');
const forgotpassRouter = require('./routes/forgotpassRoutes');
const postRouter = require('./routes/postRoutes');
const messageRouter = require('./routes/messageRoutes');
const {app, server} = require('./utils/socketio');
require('dotenv').config();
// Connect to database
connectDb();

const allowOrigins = ["https://happychat-1.onrender.com", "https://happy-chat-iota.vercel.app", "http://localhost:5000"];
const corsOption = {
  origin: function (origin, callback) {
    if (allowOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET, POST, DELETE, PATCH, PUT",
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOption));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.use("/api/auth", authRouter);
app.use("/api", forgotpassRouter);
app.use("/api/post", postRouter);
app.use("/api/message", messageRouter);

app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
