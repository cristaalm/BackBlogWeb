const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "entrada",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      titulo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      contenido: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      idcategoria: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      imgdestacada: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      fechapublicacion: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      usuario: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      estatus: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      motivorechazo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      usuariorechazo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      fecharechazo: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      }
    },
    {
      sequelize,
      tableName: "entrada",
      schema: "public",
      timestamps: false,
    }
  );
};
