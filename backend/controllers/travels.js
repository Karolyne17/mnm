const db = require("../models");
const { Op } = require("sequelize");
const { sequelize } = require("../models");

const passService = require("../services/password");
const tokenService = require("../services/token");

exports.getAll = async (req, res) => {
  //

  const travelsFound = await db.TRAVEL.findAll(
    // where: { id: id },
    //
    { include: [db.USER, db.CAR] }
  );

  //   console.log(travelsFound);

  if (travelsFound) {
    let travels = [];
    for (let travel of travelsFound) {
      let trav = {
        latStart: travel.latStart,
        longStart: travel.longStart,
        dateStart: travel.dateStart,
        latArrival: travel.latArrival,
        longArrival: travel.longArrival,
        smoker: travel.smoker,
        airconditionning: travel.airconditionning,
        user: {
          userName: travel.user.userName,
        },
        car: {
          mode: travel.car.model,
          placeQuantity: travel.car.placeQuantity,
        },
      };

      travels.push(trav);
    }

    console.log(travels);

    return res.status(200).json({ message: { travels: travels } });
  }

  // id: {
  //   type: Sequelize.DataTypes.INTEGER,
  //   primaryKey: true,
  //   autoIncrement: true,
  // },
  // latStart: {
  //   type: Sequelize.DataTypes.FLOAT,
  //   allowNull: false,
  // },
  // longStart: {
  //   type: Sequelize.DataTypes.FLOAT,
  //   allowNull: false,
  // },
  // dateStart: {
  //   type: Sequelize.DataTypes.DATE,
  //   allowNull: false,
  // },
  // latArrival: {
  //   type: Sequelize.DataTypes.FLOAT,
  //   allowNull: false,
  // },
  // longArrival: {
  //   type: Sequelize.DataTypes.FLOAT,
  //   allowNull: false,
  // },
  // smoker: {
  //   type: Sequelize.DataTypes.BOOLEAN,
  //   allowNull: false,
  // },
  // airconditionning: {
  //   type: Sequelize.DataTypes.BOOLEAN,
  //   allowNull: false,
  // },
  //   if (userFound) {
  //     let user = {
  //       userName: userFound.userName,
  //       lastName: userFound.lastName,
  //       firstName: userFound.firstName,
  //       phoneNumber: userFound.phoneNumber,
  //       email: userFound.email,
  //       photo: userFound.photo,
  //       searchingZone: userFound.searchingZone,
  //     };

  //     if (userFound.address) {
  //       user.address = {
  //         number: userFound.address.number,
  //         lineA: userFound.address.lineA,
  //         lineB: userFound.address.lineB,
  //         zipCode: userFound.address.zipCode,
  //         city: userFound.address.city,
  //       };
  //     }

  //     return res.status(200).json({ message: { user: user } });
  //   } else {
  //     return res.status(200).json({ message: { txt: "utilisateur pas trouvé" } });
  //   }
};
