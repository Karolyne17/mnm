const { Sequelize, DataTypes } = require("sequelize");

const user = process.env.SQL_USER;
const pass = process.env.SQL_PASS;
const cluster = process.env.SQL_URL;
const dbname = process.env.SQL_DB;
const dialect = process.env.SQL_DIALECT;
const port = process.env.SQL_PORT;

const db = {};

const mysql = require("mysql2/promise");
mysql
  .createConnection({
    user: user,
    password: pass,
    port: port,
  })
  .then((connection) => {
    connection.query("CREATE DATABASE IF NOT EXISTS mnm;").then(() => {
      const sequelize = new Sequelize(dbname, user, pass, {
        host: cluster,
        dialect: dialect,
        logging: false, // ...
        port: port,
      });

      db.Sequelize = Sequelize;
      db.sequelize = sequelize;

      db.ADDRESS = require("./Address.js")(sequelize, Sequelize);
      db.ALERT = require("./Alert.js")(sequelize, Sequelize);
      db.BOOKING = require("./Booking.js")(sequelize, Sequelize);
      db.CAR = require("./Car.js")(sequelize, Sequelize);
      db.MESSAGE = require("./Message.js")(sequelize, Sequelize);
      db.NOTIFICATION = require("./Notification.js")(sequelize, Sequelize);
      db.RATE = require("./Rate.js")(sequelize, Sequelize);
      db.REPORT = require("./Report.js")(sequelize, Sequelize);
      db.TRAVEL = require("./Travel.js")(sequelize, Sequelize);
      db.USER = require("./User.js")(sequelize, Sequelize);

      // un utilisateur possède potentiellement plusieurs véhicules
      // un véhicule a un seul propriétaire
      db.USER.hasMany(db.CAR, {
        foreignKey: "owner_id",
      });
      db.CAR.belongsTo(db.USER, {
        foreignKey: { name: "owner_id", allowNull: false },
      });
      // un utilisateur peut potentiellement proposer plusieurs trajets
      // un véhicule peut être utilisé pour plusieurs trajets
      // un trajet a un seul conducteur et une seule voiture
      db.USER.hasMany(db.TRAVEL, {
        foreignKey: "driver_id",
      });
      db.TRAVEL.belongsTo(db.USER, {
        foreignKey: { name: "driver_id", allowNull: false },
      });
      db.CAR.hasMany(db.TRAVEL, {
        foreignKey: "car_id",
      });
      db.TRAVEL.belongsTo(db.CAR, {
        foreignKey: { name: "car_id", allowNull: false },
      });

      // un booking concerne un utilisateur et un trajet
      db.USER.belongsToMany(db.TRAVEL, {
        through: db.BOOKING,
        foreignKey: "passenger_id",
      });
      db.TRAVEL.belongsToMany(db.USER, {
        through: db.BOOKING,
        foreignKey: "travel_id",
      });

      // une notif concerne un utilisateur
      // un utilisateur peut recevoir plusieurs notif
      db.USER.hasMany(db.NOTIFICATION, {
        foreignKey: "user_id",
      });
      db.NOTIFICATION.belongsTo(db.USER, {
        foreignKey: { name: "user_id", allowNull: false },
      });

      // un message concerne l'utilisateur émetteur et l'utilisateur destinataire
      db.USER.hasMany(db.MESSAGE, {
        foreignKey: "sender_id",
      });
      db.MESSAGE.belongsTo(db.USER, {
        foreignKey: { name: "sender_id", allowNull: false },
      });
      db.USER.hasMany(db.MESSAGE, {
        foreignKey: "receiver_id",
      });
      db.MESSAGE.belongsTo(db.USER, {
        foreignKey: { name: "receiver_id", allowNull: false },
      });

      // un report concerne l'utilisateur plaignant et l'utilisateur accusé
      db.USER.hasMany(db.REPORT, {
        foreignKey: "reporter_id",
      });
      db.REPORT.belongsTo(db.USER, {
        foreignKey: { name: "reporter_id", allowNull: false },
      });
      db.USER.hasMany(db.REPORT, {
        foreignKey: "reported_id",
      });
      db.REPORT.belongsTo(db.USER, {
        foreignKey: { name: "reported_id", allowNull: false },
      });

      //une alerte concerne un trajet et l'utilisateur qui l'envoie
      db.USER.hasMany(db.ALERT, {
        foreignKey: "user_id",
      });
      db.ALERT.belongsTo(db.USER, {
        foreignKey: { name: "user_id", allowNull: false },
      });
      db.TRAVEL.hasMany(db.ALERT, {
        foreignKey: "travel_id",
      });
      db.ALERT.belongsTo(db.TRAVEL, {
        foreignKey: { name: "travel_id", allowNull: false },
      });

      //adresses
      db.ADDRESS.hasMany(db.USER, {
        foreignKey: "address_id",
      });
      db.USER.belongsTo(db.ADDRESS, {
        foreignKey: { name: "address_id", allowNull: false },
      });

      db.sequelize
        .authenticate()
        .then((result) => {
          console.log(
            "Connection to database has been established successfully."
          );
          db.sequelize.sync({ force: true }).then(async () => {
            console.log("Database ready.");
          });
        })
        .catch((error) => {
          console.error("Unable to connect to the database: ", error);
        });
    });
  });

module.exports = db;
