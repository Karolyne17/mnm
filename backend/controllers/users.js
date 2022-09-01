const db = require("../models");
const { Op } = require("sequelize");
const { sequelize } = require("../models");

const passService = require("../services/password");
const tokenService = require("../services/token");

exports.signup = async (req, res) => {
  console.log("tentative d in scription");
  const password = req.body.password;
  const hashedPassword = await passService.hashPassword(password);
  const email = req.body.email;

  const emailFound = await db.USER.findOne({ where: { email: email } });
  if (emailFound) {
    return res.status(200).json({
      message: {
        txt: "An account with this email address already exists.",
        code: "email_already_used",
      },
    });
  }

  let user = db.USER.build({
    password: hashedPassword,
    email: email,
  });
  await user.save();

  return res.status(200).json({ message: { txt: "Inscription réussie" } });
};

exports.signin = async (req, res) => {
  console.log("tentative de connexion");
  const password = req.body.password;
  const hashedPassword = await passService.hashPassword(password);
  const email = req.body.email;

  const userFound = await db.USER.findOne({ where: { email: email } });

  if (userFound) {
    const isPasswordCorrect = await passService.comparePasswords(
      password,
      userFound.password
    );
    if (isPasswordCorrect) {
      const token = tokenService.createToken({ userId: userFound.id });
      console.log("connecté");
      return res
        .status(200)
        .json({ message: { id: userFound.id, token: token, pass: true } });
    } else {
      console.log("Wrong password.");
      return res
        .status(200)
        .json({ message: { txt: "mauvais password", pass: false } });
    }
  } else {
    console.log("User doesn't exist.");
    return res
      .status(200)
      .json({ message: { txt: "mauvais email", pass: false } });
  }
};

exports.profile = async (req, res) => {
  const userId = req.userId;

  let id = userId;
  if (req.params.id) {
    id = req.params.id;
  }

  const userFound = await db.USER.findOne({
    where: { id: id },
    include: [db.ADDRESS, db.CAR, db.TRAVEL],
  });

  if (userFound) {
    let nbPassengers = await userFound.countTravels();
    let user = {
      userName: userFound.userName,
      lastName: userFound.lastName,
      firstName: userFound.firstName,
      phoneNumber: userFound.phoneNumber,
      email: userFound.email,
      photo: userFound.photo,
      searchingZone: userFound.searchingZone,
    };

    if (userFound.address) {
      user.address = {
        number: userFound.address.number,
        lineA: userFound.address.lineA,
        lineB: userFound.address.lineB,
        zipCode: userFound.address.zipCode,
        city: userFound.address.city,
      };
    }

    if (userFound.cars) {
      user.cars = [];
      for (let car of userFound.cars) {
        let usercar = {
          model: car.model,
          placeQuantity: car.placeQuantity,
          matriculation: car.matriculation,
          color: car.color,
        };
        user.cars.push(usercar);
      }
    }

    user.myTravels = [];
    user.myBookings = [];

    if ((await userFound.countDrived()) > 0) {
      let travelsDrived = await userFound.getDrived();
      for (let travel of travelsDrived) {
        let trav = {
          latStart: travel.latStart,
          longStart: travel.longStart,
          cityStart: travel.cityStart,
          dateStart: travel.dateStart,
          latArrival: travel.latArrival,
          longArrival: travel.longArrival,
          cityArrival: travel.cityArrival,
          smoker: travel.smoker,
          airconditionning: travel.airconditionning,
        };

        let pass = await travel.getUsers();
        let driv = await travel.getUser();

        trav.driver = { id: driv.id, userName: driv.userName };
        trav.passengers = [];
        for (let u of pass) {
          trav.passengers.push({ id: u.id, userName: u.userName });
        }

        user.myTravels.push(trav);
      }
    }

    if (nbPassengers > 0) {
      for (let travel of userFound.travels) {
        let trav = {
          latStart: travel.latStart,
          longStart: travel.longStart,
          cityStart: travel.cityStart,
          dateStart: travel.dateStart,
          latArrival: travel.latArrival,
          longArrival: travel.longArrival,
          cityArrival: travel.cityArrival,
          smoker: travel.smoker,
          airconditionning: travel.airconditionning,
        };

        let pass = await travel.getUsers();
        let driv = await travel.getUser();
        trav.driver = { id: driv.id, userName: driv.userName };
        trav.passengers = [];
        for (let u of pass) {
          trav.passengers.push({ id: u.id, userName: u.userName });
        }

        user.myBookings.push(trav);
      }
    }

    return res.status(200).json({ message: { user: user } });
  } else {
    return res.status(200).json({ message: { txt: "utilisateur pas trouvé" } });
  }
};

exports.updateProfile = async (req, res) => {
  const userId = req.userId;

  const userName = req.body.userName;
  const lastName = req.body.lastName;
  const firstName = req.body.firstName;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const photo = req.body.photo;
  const searchingZone = req.body.searchingZone;

  const number = req.body.number;
  const lineA = req.body.lineA;
  const lineB = req.body.lineB;
  const zipCode = req.body.zipCode;
  const city = req.body.city;

  const userFound = await db.USER.findOne({
    where: { id: userId },
    include: [db.ADDRESS],
  });

  userFound.userName = userName;
  userFound.lastName = lastName;
  userFound.firstName = firstName;
  userFound.phoneNumber = phoneNumber;
  userFound.email = email;
  userFound.photo = photo;
  userFound.searchingZone = searchingZone;

  let address = db.ADDRESS.build({
    number: number,
    lineA: lineA,
    lineB: lineB,
    zipCode: zipCode,
    city: city,
  });
  await address.save();

  await userFound.setAddress(address);
  await userFound.save();

  return res.status(200).json({ message: { txt: "Utilisateur updaté" } });
};

exports.addCar = async (req, res) => {
  const userId = req.userId;

  const model = req.body.model;
  const placeQuantity = req.body.placeQuantity;
  const matriculation = req.body.matriculation;
  const color = req.body.color;

  let car = db.CAR.build({
    model: model,
    placeQuantity: placeQuantity,
    matriculation: matriculation,
    color: color,
    owner_id: userId,
  });
  await car.save();

  return res.status(200).json({ message: { txt: "Voiture ajoutée" } });
};

exports.removeCar = async (req, res) => {
  const userId = req.userId;
  const carId = req.params.id;

  const userFound = await db.USER.findOne({
    where: { id: userId },
  });

  if (userFound) {
    await userFound.removeCar(carId);
    await userFound.save();

    return res.status(200).json({ message: { text: "voiture supprimée" } });
  } else {
    return res.status(200).json({ message: { txt: "user pas trouvé" } });
  }
};
