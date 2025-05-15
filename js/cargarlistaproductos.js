const params = new URLSearchParams(window.location.search);
const producto = params.get("producto");

document.getElementById("titulo-categoria").textContent = producto?.toUpperCase() || "Producto";

fetch("../data/productos.json")
  .then(res => res.json())
  .then(productos => {
    const contenedor = document.getElementById("lista-productos");
    const productosFiltrados = productos.filter(p => p.producto === producto);

    contenedor.innerHTML = "";

    if (productosFiltrados.length === 0) {
      contenedor.innerHTML = `<p class="text-center text-gray-600 col-span-3">No hay productos en esta categoría.</p>`;
      return;
    }

    productosFiltrados.forEach(prod => {
      const div = document.createElement("div");
      div.className = "bg-white rounded-2xl shadow-md p-4 text-center hover:shadow-lg transition-all";
      div.innerHTML = `
        <img src="../${prod.imagen || 'images/default.png'}" alt="${prod.caracteristicas}" class="w-full h-48 object-contain rounded mb-4">
        <h3 class="text-xl font-semibold text-purple-700 mb-2">${prod.caracteristicas}</h3>
        <p class="text-gray-600 mb-2">${prod.tipo}</p>
        <button class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded" data-id="${prod.id}">
          Ver más
        </button>
      `;
      contenedor.appendChild(div);
    });

    // Guardar los productos para el modal
    document.productosFiltrados = productosFiltrados;
  });

// Modal
document.getElementById("lista-productos").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.getAttribute("data-id");
    const productoSeleccionado = document.productosFiltrados.find(p => p.id === id);

    if (productoSeleccionado) {
      document.getElementById("contenido-modal").innerHTML = `
        <h2 class="text-xl font-bold text-purple-700">${productoSeleccionado.tipo}</h2>
        <img src="../${productoSeleccionado.imagen}" alt="${productoSeleccionado.tipo}" class="w-full h-48 object-contain mx-auto rounded">
        <h3> Descripción </h3>
        <p class="black mt-4">${productoSeleccionado.descripcion}</p>
      `;
      document.getElementById("modal").classList.remove("hidden");
    }
  }
});

document.getElementById("cerrar-modal").addEventListener("click", () => {
  document.getElementById("modal").classList.add("hidden");
});
