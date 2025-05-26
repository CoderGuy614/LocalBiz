const express = require("express");
const connectDB = require("./localbiz-backend/config/db"); 
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();


const authRoutes = require("./localbiz-backend/routes/api/auth");
const userRoutes = require("./localbiz-backend/routes/api/users");
const categoryRoutes = require("./localbiz-backend/routes/api/categories");
const itemRoutes = require("./localbiz-backend/routes/api/items");
const bizRoutes = require("./localbiz-backend/routes/api/biz");
const messageRoutes = require("./localbiz-backend/routes/api/messages");

const app = express();

//Connect Database
connectDB();

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Update CORS to allow your frontend URL
// In your backend server.js file
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'https://master.d28l3w9jtysc89.amplifyapp.com',
    'https://d28l3w9jtysc89.amplifyapp.com' 
  ],
  credentials: true
}));
app.options('*', cors());

app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", itemRoutes);
app.use("/api", bizRoutes);
app.use("/api", messageRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server is running on ${PORT}`));
