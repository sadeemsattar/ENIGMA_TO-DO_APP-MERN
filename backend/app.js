const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { validateToken } = require("./middleware/JWT");
const cookieParser = require("cookie-parser");

const loginRoute = require("./routes/loginRoute");
const userRoute = require("./routes/userRoute");

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "build")));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
    ] /*added after attendance issue.need to do it in clinet-server achitect(told by pedro). might delet later*/,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// Routes MiddleWare
app.use("/security", loginRoute);
app.use("/user", validateToken, userRoute);

app.use("*", (req, res) => {
  res.status(404).send("404 page not found");
});

module.exports = app;
