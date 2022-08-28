require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:4200" }));

const db = require("./models");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});

app.get("/", (req, res) => {
  res.status(200).send("OK ça marche");
});
