require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.ORIGIN }));

const db = require("./models");

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});

app.get("/", (req, res) => {
  res.status(200).send("OK ça marche");
});

const usersRoutes = require("./routes/users");
const travelsRoutes = require("./routes/travels");

const apiPath = "/api";

app.use(apiPath, usersRoutes);
app.use(apiPath, travelsRoutes);

app.get("/bdd", async (req, res) => {
  await db.sequelize.query(
    "INSERT INTO users (id, userName, firstName, lastName, phoneNumber, email, photo, searchingZone, createdAt, updatedAt, deletedAt, password, address_id) VALUES (NULL, 'Roger', 'TT', 'Man', '0625476812', 'roger@tt.com', NULL, 200, '2022-08-29 13:54:47', '2022-08-29 13:54:47', '2022-08-29 13:54:47', '$2b$08$jsWnL3eW0IlMhVbQclXrR.Tiu4/qcDr0mr9661XMhA5nSEC3w9pLO', NULL),(NULL, 'Mamy', 'Mamy', 'Mamamia', '074587458965', 'mam@my.com', NULL, 100, '2022-08-29 13:54:47', '2022-08-29 13:54:47', '2022-08-29 13:54:47', '$2b$08$vHk8mf8vYw5HcODVSzVJF.SnvQ3H5Pny8rBDgJqhjF8iLEG1lgqby', NULL);"
  );
  await db.sequelize.query(
    "INSERT INTO cars (id, model, placeQuantity, matriculation, color, createdAt, updatedAt, deletedAt, owner_id) VALUES(NULL, 'Vega missile', 3, NULL, 'NOIRE', '2022-08-29 13:56:02', '2022-08-29 13:56:02', '2022-08-29 13:56:02', 1),(NULL, 'Alpha romeo', 2, NULL, 'rouge', '2022-08-29 13:56:30', '2022-08-29 13:56:30', '2022-08-29 13:56:30', 2);"
  );
  await db.sequelize.query(
    "INSERT INTO travels (id, latStart, longStart, dateStart, latArrival, longArrival, smoker, airconditionning, createdAt, updatedAt, deletedAt, driver_id, car_id) VALUES (NULL, 49.1333, 6.16667, '2022-08-31 15:53:29', 49.9, 6.6969, 1, 0, '2022-08-29 13:53:29', '2022-08-29 13:53:29', '2022-08-29 13:53:29', 1, 1),(NULL, 25.222, 30.4512, '2022-08-30 15:53:29', 10.2564, 9.855, 0, 0, '2022-08-29 13:53:29', '2022-08-29 13:53:29', '2022-08-29 13:53:29', 2, 2);"
  );

  res.status(200).send("bdd remplie");
});
