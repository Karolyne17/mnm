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
    "INSERT INTO addresses (id, number, lineA, lineB, zipCode, city, createdAt, updatedAt, deletedAt) VALUES (NULL, '8 bis', 'rue du poulet', '', '57000', 'Metz', '2022-08-29 13:56:30', '2022-08-29 13:56:30', NULL), (NULL, '25', 'avenue de monaco', 'truc', '69069', 'Lyon', '2022-08-29 13:56:30', '2022-08-29 13:56:30', NULL);"
  );
  await db.sequelize.query(
    "INSERT INTO users (id, userName, firstName, lastName, phoneNumber, email, photo, searchingZone, createdAt, updatedAt, deletedAt, password, address_id) VALUES (NULL, 'Roger', 'TT', 'Man', '0625476812', 'roger@tt.com', NULL, 200, '2022-08-29 13:54:47', '2022-08-29 13:54:47', '2022-08-29 13:54:47', '$2b$08$jsWnL3eW0IlMhVbQclXrR.Tiu4/qcDr0mr9661XMhA5nSEC3w9pLO', 1),(NULL, 'Mamy', 'Mamy', 'Mamamia', '074587458965', 'mam@my.com', NULL, 100, '2022-08-29 13:54:47', '2022-08-29 13:54:47', '2022-08-29 13:54:47', '$2b$08$vHk8mf8vYw5HcODVSzVJF.SnvQ3H5Pny8rBDgJqhjF8iLEG1lgqby', 2), (NULL, 'Soph', 'Sophie', 'Marsso', '0611475821', 'so@fi.com', NULL, 100, '2022-08-29 13:54:47', '2022-08-29 13:54:47', '2022-08-29 13:54:47', '$2b$08$vHk8mf8vYw5HcODVSzVJF.SnvQ3H5Pny8rBDgJqhjF8iLEG1lgqby', NULL);"
  );
  await db.sequelize.query(
    "INSERT INTO cars (id, model, placeQuantity, matriculation, color, createdAt, updatedAt, deletedAt, owner_id) VALUES(NULL, 'Vega missile', 3, NULL, 'NOIRE', '2022-08-29 13:56:02', '2022-08-29 13:56:02', '2022-08-29 13:56:02', 1),(NULL, 'Alpha romeo', 2, NULL, 'rouge', '2022-08-29 13:56:30', '2022-08-29 13:56:30', '2022-08-29 13:56:30', 2), (NULL, 'Fiat multipla', 5, NULL, 'gris', '2022-08-29 13:56:30', '2022-08-29 13:56:30', '2022-08-29 13:56:30', 1);"
  );
  await db.sequelize.query(
    "INSERT INTO travels (id, latStart, longStart, cityStart, dateStart, latArrival, longArrival, cityArrival, smoker, airconditionning, createdAt, updatedAt, deletedAt, driver_id, car_id, price) VALUES (NULL, 49.12050593176526, 6.176398302969596, 'Metz', '2022-08-31 15:53:29', 49.10690889776032, 6.17669532660292, 'MNS', 1, 0, '2022-08-29 13:53:29', '2022-08-29 13:53:29', '2022-08-29 13:53:29', 1, 1, 5),(NULL, 49.10690889776032, 6.17669532660292, 'MNS', '2022-08-30 15:53:29', 49.09692311238716, 6.142755324063217, 'Montigny-les-metz', 0, 0, '2022-08-29 13:53:29', '2022-08-29 13:53:29', '2022-08-29 13:53:29', 2, 2, 3.50);"
  );
  await db.sequelize.query(
    "INSERT INTO bookings (id, comment, acceptedAt, refusedAt, createdAt, updatedAt, deletedAt, passenger_id, travel_id) VALUES (NULL, 'Je possède 5 chiens', NULL, NULL, '2022-08-29 13:56:02', '2022-08-29 13:56:02', NULL, 3, 1),(NULL, 'Je suis accompagnée de 5 labradors', NULL, NULL, '2022-08-29 13:56:02', '2022-08-29 13:56:02', NULL, 3, 2),(NULL, '', NULL, NULL, '2022-08-29 13:56:02', '2022-08-29 13:56:02', NULL, 1, 2);"
  );

  await db.sequelize.query(
    "INSERT INTO admins (id, userName, createdAt, updatedAt, deletedAt, password) VALUES (NULL, 'admin', '2022-08-29 13:54:47', '2022-08-29 13:54:47', '2022-08-29 13:54:47', '$2b$08$DEkljiDZzvTBFW95HfYusu1F/y63QuShBa77OXnOneobFKDk1LUSO');"
  );

  await db.sequelize.query(
    "INSERT INTO messages (id, message, createdAt, updatedAt, deletedAt, readAt, sender_id, receiver_id) VALUES(NULL, 'Salut moi c roger ma voiture est super', '2022-08-29 13:54:47', '2022-08-29 13:54:47', '2022-08-29 13:54:47', NULL, 1, 2),(NULL, 'Avec la vega myssil vous serez SATELLISÉS!!!', '2022-08-29 13:54:47', '2022-08-29 13:54:47', '2022-08-29 13:54:47', NULL, 1, 2),(NULL, 'Amène un sandwich pour le trajet', '2022-08-29 13:54:47', '2022-08-29 13:54:47', '2022-08-29 13:54:47', NULL, 1, 3), (NULL, 'Serait-il possible de faire un détour par la Russie ?', '2022-08-29 13:54:47', '2022-08-29 13:54:47', '2022-08-29 13:54:47', NULL, 2, 1), (NULL, 'possible de décaler le trajet de 20 min ?', '2022-08-29 13:54:47', '2022-08-29 13:54:47', '2022-08-29 13:54:47', NULL, 2, 1),(NULL, 'Ma voiture a pas le controle technique', '2022-08-29 13:54:47', '2022-08-29 13:54:47', '2022-08-29 13:54:47', NULL, 3, 1),(NULL, 'Bjr...', '2022-08-29 13:54:47', '2022-08-29 13:54:47', '2022-08-29 13:54:47', NULL, 3, 2);"
  );

  res.status(200).send("bdd remplie");
});
