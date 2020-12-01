const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

const cors = require("cors");

app.use(cors());

const rootDir = path.join(__dirname, "../");

app.use(express.static(path.join(rootDir, "client/build")));

const apiRouter = require("./routes/api");

app.use("/api", apiRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(rootDir, "client/build", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`App listening on ${port}!`);
