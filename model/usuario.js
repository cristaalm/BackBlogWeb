const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('usuario', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, 
      allowNull: false,
      primaryKey: true
    },
    nombreusuario: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    correoelectronico: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    'contraseña': {
      type: DataTypes.TEXT,
      allowNull: true
    },
    perfil: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'usuario',
    schema: 'public',
    timestamps: false
  });
};
