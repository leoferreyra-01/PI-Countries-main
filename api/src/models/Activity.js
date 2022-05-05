const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("activity", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    difficulty: {
      type: DataTypes.ENUM,
      allowNull:false,
      values: [
        "Beginner",
        "Amateur",
        "Normal",
        "Professional",
        "Expert",
      ],
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    season: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["Summer", "Autumn", "Winter", "Spring"],
    },
  }, {timestamps: false});
};
