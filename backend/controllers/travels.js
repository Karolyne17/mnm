const db = require("../models");
const { Op } = require("sequelize");
const { sequelize } = require("../models");

const passService = require("../services/password");
const tokenService = require("../services/token");

exports.getAll = async (req, res) => {
  const travelsFound = await db.TRAVEL.findAll({
    include: [db.USER, db.CAR],
  });

  if (travelsFound) {
    let travels = [];
    for (let travel of travelsFound) {
      let nbUsers = await travel.countUsers();
      let trav = {
        id: travel.id,
        latStart: travel.latStart,
        longStart: travel.longStart,
        cityStart: travel.cityStart,
        dateStart: travel.dateStart,
        latArrival: travel.latArrival,
        longArrival: travel.longArrival,
        cityArrival: travel.cityArrival,
        smoker: travel.smoker,
        airconditionning: travel.airconditionning,
        user: {
          id: travel.user.id,
          userName: travel.user.userName,
        },
        car: {
          model: travel.car.model,
          placeQuantity: travel.car.placeQuantity - nbUsers,
        },
        passengers: [],
      };

      if (nbUsers > 0) {
        let passengers = await travel.getUsers();
        for (let passenger of passengers) {
          let pass = {
            id: passenger.id,
            userName: passenger.userName,
          };
          trav.passengers.push(pass);
        }
      }

      travels.push(trav);
    }

    return res.status(200).json({ message: { travels: travels } });
  }
};

exports.removeTravel = async (req, res) => {
  const travelId = req.params.id;
  const userId = req.userId;

  const travelFound = await db.TRAVEL.findOne({
    where: { id: travelId, driver_id: userId },
  });

  if (travelFound) {
    travelFound.destroy();

    return res.status(200).json({ message: { text: "voyage supprimé" } });
  } else {
    return res.status(200).json({ message: { txt: "voyage pas trouvé" } });
  }
};

exports.getTravel = async (req, res) => {
  const id = req.params.id;
  const userId = req.userId;

  const travelFound = await db.TRAVEL.findOne({
    where: { id: id },
    include: [db.USER, db.CAR],
  });

  let nbUsers = await travelFound.countUsers();

  if (travelFound) {
    let travel = {
      latStart: travelFound.latStart,
      longStart: travelFound.longStart,
      cityStart: travelFound.cityStart,
      dateStart: travelFound.dateStart,
      latArrival: travelFound.latArrival,
      longArrival: travelFound.longArrival,
      cityArrival: travelFound.cityArrival,
      smoker: travelFound.smoker,
      airconditionning: travelFound.airconditionning,
      user: {
        id: travelFound.user.id,
        userName: travelFound.user.userName,
      },
      car: {
        model: travelFound.car.model,
        placeQuantity: travelFound.car.placeQuantity - nbUsers,
      },
      passengers: [],
      isAlreadyBooked: false,
    };

    // let nbUsers = await travelFound.countUsers();
    if (nbUsers > 0) {
      let passengers = await travelFound.getUsers();
      for (let passenger of passengers) {
        let pass = {
          id: passenger.id,
          userName: passenger.userName,
        };
        if (userId == passenger.id) {
          travel.isAlreadyBooked = true;
        }
        travel.passengers.push(pass);
      }
    }

    return res.status(200).json({ message: { travel: travel } });
  } else {
    return res.status(200).json({ message: { txt: "voyage pas trouvé" } });
  }
};

exports.book = async (req, res) => {
  const travelId = req.params.id;
  const userId = req.userId;
  const comment = req.body.comment;

  const travelFound = await db.TRAVEL.findOne({
    where: { id: travelId },
  });

  if (travelFound) {
    travelFound.addUser(userId, { through: { comment: comment } });
    travelFound.save();

    return res.status(200).json({ message: { travel: travelFound } });
  } else {
    return res.status(200).json({ message: { txt: "voyage pas trouvé" } });
  }
};

exports.cancelBooking = async (req, res) => {
  const travelId = req.params.id;
  const userId = req.userId;

  const travelFound = await db.TRAVEL.findOne({
    where: { id: travelId },
  });

  if (travelFound) {
    travelFound.removeUser(userId);
    travelFound.save();

    return res.status(200).json({ message: { text: "réservation supprimée" } });
  } else {
    return res.status(200).json({ message: { txt: "voyage pas trouvé" } });
  }
};

exports.addTravel = async (req, res) => {
  const userId = req.userId;
  const latStart = req.body.latStart;
  const longStart = req.body.longStart;
  const cityStart = req.body.cityStart;
  const dateStart = req.body.dateStart;
  const latArrival = req.body.latArrival;
  const longArrival = req.body.longArrival;
  const cityArrival = req.body.cityArrival;
  const smoker = req.body.smoker;
  const airconditionning = req.body.airconditionning;
  const carId = req.body.carId;

  let travel = db.TRAVEL.build({
    latStart: latStart,
    longStart: longStart,
    cityStart: cityStart,
    dateStart: dateStart,
    latArrival: latArrival,
    longArrival: longArrival,
    cityArrival: cityArrival,
    smoker: smoker,
    airconditionning: airconditionning,
    car_id: carId,
    driver_id: userId,
  });
  travel.save();

  return res.status(200).json({ message: { txt: "voyage ajouté" } });
};
