const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    reg_code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "reg_code"
    },
    company: {
      type: DataTypes.STRING(50),
      allowNull: true,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "company"
    },
  };
  const options = {
    tableName: "regcodes",
    timestamps: true,
    updatedAt: false,
    comment: "",
    indexes: []
  };
  const RegcodesModel = sequelize.define("regcodes_model", attributes, options);
  return RegcodesModel;
};