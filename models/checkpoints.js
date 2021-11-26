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
    location: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "location"
    },
    points: {
      type: DataTypes.INTEGER(10),
      defaultValue: 10,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "points"
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "createdAt"
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "timestamp"
    }
  };
  const options = {
    tableName: "checkpoints",
    timestamps: true,
    updatedAt: false,
    comment: "",
    indexes: []
  };
  const CheckpointsModel = sequelize.define("checkpoints", attributes, options);
  return CheckpointsModel;
};