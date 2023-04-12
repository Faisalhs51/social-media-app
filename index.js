const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/posts"));

connectToMongo().then(() => {
  app.listen(port, () => {
    console.log(`Social Media backend listening at http://localhost:${port}`);
  });
});

module.exports = app;
