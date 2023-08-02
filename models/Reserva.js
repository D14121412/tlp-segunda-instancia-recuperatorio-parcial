// TODO: Crear modelo de datos de Reserva
const { DataTypes, sequelize } = require("../database");

const Reserva = sequelize.define(
  "Reserva",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Pelicula: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fechaPelicula: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    HoraInicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    Sala: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Asiento: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Restricción de unicidad para el asiento
    },
    Precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    estado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: "reservas",
  }
);

// Crear tabla si no existe ({force: true} borra y crea la tabla)
Reserva.sync({ force: false }).then(() => {
  console.log("Tabla creada");
});

module.exports = Reserva;
