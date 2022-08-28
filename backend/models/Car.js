module.exports = (sequelize, Sequelize) => {
  const Car = sequelize.define("car", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    model: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    placeQuantity: {
      type: Sequelize.DataTypes.INTEGER,
    },
    matriculation: {
      type: Sequelize.DataTypes.STRING,
    },
    color: {
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
  return Car;
};
