module.exports = (sequelize, Sequelize) => {
  const Travel = sequelize.define("travel", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    latStart: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
    },
    longStart: { 
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
    },
    dateStart: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false,
    },
    latArrival: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
    },
    longArrival: {
      type: Sequelize.DataTypes.FLOAT,
      allowNull: false,
    },
    smoker: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
    },
    airconditionning: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DataTypes.DATE,
      defaultValue: Sequelize.DataTypes.NOW,
      allowNull: false,
    },
    deletedAt: {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    },
  });
  return Travel;
};
