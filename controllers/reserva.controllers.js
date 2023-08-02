// TODO: Crear controladores para cada una de las rutas de reserva.
const Reserva = require("../models/Reserva");
const ctrl = {};
// ==========================================
//    Controladores para renderizar vistas
// ==========================================

// Obtener todas las reservas
ctrl.renderListaReservas = (req, res) => {
  res.render("index");
};
// Formulario para crear una reserva
ctrl.renderFormNuevaReserva = (req, res) => {
  res.render("nuevo");
};

// Formulario para editar una reserva
ctrl.renderFormEditarReserva = (req, res) => {
  const { id } = req.params;
  res.render("editar", { id });
};

// ==========================================
//     Controladores para CRUD de reservas
// ==========================================

// Obtener todas las reservas
ctrl.obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      where: {
        estado: true,
      },
    });

    return res.json(reservas);
  } catch (error) {
    console.log("Error al obtener las reservas", error);
    return res.status(500).json({
      message: "Error al obtener las reservas",
    });
  }
};

// Obtener una reserva
ctrl.obtenerReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await Reserva.findOne({
      whare: {
        estado: true,
        id,
      },
    });
    return res.json(reserva);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al obtener la reserva",
    });
  }
};

// Crear una reserva
ctrl.crearReserva = async (req, res) => {
  const { nombre, apellido, pelicula, fecha, sala, asiento, precio } = req.body; // JSON.stringify(reserva);

  try {
    // Se crea una nueva instancia de reserva
    const nuevaReserva = new Reserva({
      nombre,
      codigo: new Date().getTime(),
      apellido,
      pelicula,
      fecha,
      sala,
      asiento,
      precio,
    });

    // Se guarda en la BD
    await nuevaReserva.save();

    return res.status(201).json({ message: "Reserva creada con éxito" });
  } catch (error) {
    console.log("Error al crear la reserva", error);
    return res.status(500).json({ message: "Error al crear la reserva" });
  }
};

// Actualizar una reserva
ctrl.actualizarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const reserva = await Reserva.findByPk(id);
    await reserva.update(req.body);
    return res.json({
      message: "Reserva actualizada exitosamente",
    });
  } catch (error) {
    console.log("Error al actualizar la reserva", error);
    return res.status(error.status || 500).json({
      message: error.message,
    });
  }
};

// Eliminar una reserva de forma lógica
ctrl.eliminarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw {
        status: 400,
        message: "No se ha enviado el id de la reserva",
      };
    }
    const reserva = await Reserva.findByPk(id);
    await reserva.update({ estado: false });
    return res.json({ message: "Reserva se eliminó correctamente" });
  } catch (error) {
    console.log("Error al eliminar la reserva", error);
    return res.status(error.status || 500).json({
      message: error.message || "Error al eliminar la reserva",
    });
  }
};

module.exports = ctrl;
