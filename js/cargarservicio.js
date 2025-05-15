const params = new URLSearchParams(window.location.search);
const servicio = params.get("servicio");

document.getElementById("titulo-servicio").textContent = servicio?.toUpperCase() || "SERVICIO";

fetch("../data/servicios.json")
  .then(res => res.json())
  .then(productos => {
    const contenedor = document.getElementById('lista-servicios');
    const productoFiltrado = productos.find(s => s.servicio === servicio);

    if (!productoFiltrado) {
      contenedor.innerHTML = `<p>No hay productos con ese nombre de servicio.</p>`;
      return;
    }

    // Solo reemplazamos \n si existen en la descripción
    const descripcion = productoFiltrado.descripcion.includes('\\n') || productoFiltrado.descripcion.includes('\n')
      ? productoFiltrado.descripcion.replace(/\\n|\n/g, "<br>")
      : productoFiltrado.descripcion;

    const div = document.createElement('div');
    div.innerHTML = `
      <p>${descripcion}</p>
    `;
    contenedor.appendChild(div);
  });