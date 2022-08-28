module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define("address", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    number: {
      type: Sequelize.DataTypes.STRING,
    },
    lineA: {
      type: Sequelize.DataTypes.STRING,
    },
    lineB: {
      type: Sequelize.DataTypes.STRING,
    },
    zipCode: {
      type: Sequelize.DataTypes.STRING,
    },
    city: {
      type: Sequelize.DataTypes.STRING,
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
  return Address;
};
