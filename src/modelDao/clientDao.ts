import { DataTypes } from "sequelize";
const bCrypt = require("sequelize-bcrypt");

import { sequelize } from "../../connectDatabase";

import { options } from "../../options";

const Client = sequelize.define(
  "Client",
  {
    CLTID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "CLTID",
    },
    CLTNAME: {
      type: DataTypes.STRING(50),
      field: "CLTNAME",
    },
    CLTEMAIL: {
      type: DataTypes.STRING(50),
      field: "CLTEMAIL",
    },
    CLTPASSWORD: {
      type: DataTypes.TEXT,
      field: "CLTPASSWORD",
    },
    CLTCNPJ: {
      type: DataTypes.STRING(15),
      field: "CLTCNPJ",
    },
    CLTBUSINESSNAME: {
      type: DataTypes.STRING(20),
      field: "CLTBUSINESSNAME",
    },
    CLTFANTASYNAME: {
      type: DataTypes.STRING(30),
      field: "CLTFANTASYNAME",
    },
    CLTSOCIALREASON: {
      type: DataTypes.STRING(20),
      field: "CLTSOCIALREASON",
    },
    CLTCREATEDATE: {
      type: DataTypes.STRING,
      field: "CLTCREATEDATE",
    },
    CLTUPDATEDATE: {
      type: DataTypes.STRING,
      field: "CLTUPDATEDATE",
    },
  },
  {
    modelName: "CLIENT",
    tableName: "CLIENTS",
    timestamps: true,
    createdAt: false,
    updatedAt: false,
  }
);
Client.removeAttribute("id");
bCrypt(Client, options);

export { Client };
