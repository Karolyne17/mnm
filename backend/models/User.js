module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
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
      allowNull: false,
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
