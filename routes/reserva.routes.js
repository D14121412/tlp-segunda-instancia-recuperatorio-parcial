// TODO: Importar el modelo y controladores de reservas, luego vincular rutas con controladores

const { Router } = require("express");
const router = Router();

const {
  renderListaReservas,
  renderFormNuevaReserva,
  renderFormEditarReserva,
  obtenerReserva,
  obtenerReservas,
  crearReserva,
  actualizarReserva,
  eliminarReserva,
} = require("../controllers/reserva.controllers");

// ==========================================
//         Rutas para renderizar vistas
// ==========================================

// Vista para todas las reservas
router.get("/lista-reservas", renderListaReservas);

// Formulario para crear una reserva
router.get("/nueva-reserva", renderFormNuevaReserva);
router.get("/api/:id", obtenerReserva);

// Formulario para editar una reserva
router.get("/editar-reserva/:id", renderFormEditarReserva);

// ==========================================
//         Rutas para CRUD de reservas
// ==========================================

// Obtener todas las reservas
router.get("/api/", obtenerReservas);

// Crear una reserva
router.post("/api/", crearReserva);

// Actualizar una reserva
router.put("/api/:id", actualizarReserva);

// Eliminar una reserva de forma lógica
router.delete("/api/:id", eliminarReserva);

module.exports = router;
