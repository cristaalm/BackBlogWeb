const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comentario', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    valoracion: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    identrada: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'comentario',
    schema: 'public',
    timestamps: false
  });
};
