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
    nama_lengkap: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nama_lengkap"
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "email"
    },
    hp: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "hp"
    },
    perusahaan: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "perusahaan"
    },
    jenis_sepeda: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "jenis_sepeda"
    },
    is_active: {
      type: DataTypes.INTEGER(10),
      defaultValue: 0,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "is_active"
    },
    is_picture: {
      type: DataTypes.INTEGER(10),
      defaultValue: 0,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "is_picture"
    }
  };
  const options = {
    tableName: "cyclist",
    comment: "",
    indexes: []
  };
  const CyclistModel = sequelize.define("cyclist", attributes, options);
  return CyclistModel;
};