const formReserva = document.querySelector("#formNuevaReserva");
const reservaId = formReserva.dataset.id;

// Aleternativa utilizando la captura del pathname
// const reservaId = window.location.pathname.split('/').pop();

const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const pelicula = document.querySelector("#pelicula");
const fecha = document.querySelector("#fecha");
const sala = document.querySelector("#sala");
const asiento = document.querySelector("#asiento");
const precio = document.querySelector("#precio");

document.addEventListener("DOMContentLoaded", async () => {
  // Traemos la reserva que se va a editar
  const response = await fetch(`/api/${reservaId}`);
  const data = await response.json();

  // Mostrar en el formulario los datos de la reserva que se quiere actualizar
  nombre.value = data.nombre;
  apellido.value = data.apellido;
  pelicula.value = data.pelicula;
  fecha.value = dayjs(data.fecha).format("DD-MM-YYYY HH:mm");
  sala.value = data.sala;
  asiento.value = data.asiento;
  precio.value = data.precio;
});

formReserva.addEventListener("submit", async (e) => {
  e.preventDefault();

  reservaActualizada = {
    nombre: nombre.value,
    apellido: apellido.value,
    pelicula: pelicula.value,
    fecha: fecha.value,
    sala: sala.value,
    asiento: asiento.value,
    precio: precio.value,
  };

  // Se envían los nuevos datos al servidor express
  const response = await fetch(`/api/${reservaId}`, {
    method: "PUT",
    body: JSON.stringify(reservaActualizada),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const respToJson = await response.json();

  if (response.status !== 200) {
    return Swal.fire({
      title: "Error",
      text: respToJson.message,
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }

  // Mostrar mensajes al usuario
  Swal.fire({
    title: "Reserva actualizada",
    text: respToJson.message,
    icon: "success",
    confirmButtonText: "Aceptar",
  });

  setTimeout(() => {
    // Redireccionar al usuario
    window.location.href = "/";
  }, 2000);
});
