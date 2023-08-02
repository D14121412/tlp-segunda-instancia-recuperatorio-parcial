const formCrearReserva = document.querySelector("#formNuevaReserva");

formCrearReserva.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.querySelector("#nombre").value;
  const apellido = document.querySelector("#apellido").value;
  const pelicula = document.querySelector("#pelicula").value;
  const fecha = document.querySelector("#fecha").value;
  const sala = document.querySelector("#sala").value;
  const asiento = document.querySelector("#asiento").value;
  const precio = document.querySelector("#precio").value;

  const reserva = {
    nombre,
    apellido,
    pelicula,
    fecha,
    sala,
    asiento,
    precio,
  };

  const response = await fetch("http://localhost:4000/api", {
    method: "POST",
    body: JSON.stringify(reserva),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 201) {
    return Swal.fire({
      title: "Error",
      text: "Hubo un error al crear la reserva",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }

  const data = await response.json();

  Swal.fire({
    title: "Reserva creada",
    text: data.message,
    icon: "success",
    confirmButtonText: "Aceptar",
  });

  setTimeout(() => {
    window.location.href = "/";
  }, 2000);
});
