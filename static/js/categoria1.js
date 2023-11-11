document.addEventListener("DOMContentLoaded", function () {
  // Tu arreglo de productos
  const productos = JSON.parse(sessionStorage.getItem("productos"));

  // Función para llenar la tabla con los productos
  function llenarTabla() {
    let tabla = $("#tablaProductos").DataTable({
      responsive: true // Hace la tabla responsiva
      // Puedes agregar otras opciones de configuración aquí
    });
    tabla.clear(); // Limpiar la tabla antes de rellenar

    const filasHTML = productos.map((producto) => [
      `<img src="./../.${producto.imagen}" alt="${producto.nombre}">`,
      producto.nombre,
      producto.precio,
    ]);

    // Añadir filas a la tabla
    tabla.rows.add(filasHTML).draw();
  }

  // Llama a la función para llenar la tabla cuando el DOM esté completamente cargado
  llenarTabla();
  
});
