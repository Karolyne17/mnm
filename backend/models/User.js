module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: Sequelize.DataTypes.STRING,

    },
    firstName: {
      type: Sequelize.DataTypes.STRING,

    },
    lastName: {
      type: Sequelize.DataTypes.STRING,

    },
    phoneNumber: {
      type: Sequelize.DataTypes.STRING,
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: Sequelize.DataTypes.STRING,

    },
    searchingZone: {
      type: Sequelize.DataTypes.INTEGER,
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
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
  });
  return User;
};
