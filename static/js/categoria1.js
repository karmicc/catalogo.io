document.addEventListener("DOMContentLoaded", function () {
  // Tu arreglo de productos
  const productos = JSON.parse(sessionStorage.getItem("productos"));

  // Función para llenar la tabla con los productos
  function llenarTabla() {
    let tabla = $('#tablaProductos').DataTable({
      responsive: true,
      columnDefs: [
        { responsivePriority: 1, targets: 0}, // Prioridad alta en la primera columna (Imagen)
        { responsivePriority: 2, targets: [1, 2], visible: false }  // Prioridad baja en la tercera columna (Precio)
      ],
    });


    tabla.clear(); // Limpiar la tabla antes de rellenar

    const filasHTML = productos.map((producto) => [
        `<div class="text-center"><img src="./../.${producto.imagen}" alt="${producto.nombre}" class="img-fluid"></div>`,
        producto.nombre,
        producto.precio,
      ]);

    // Añadir filas a la tabla
    tabla.rows.add(filasHTML).draw();
    // Configurar el evento click para expandir filas
    $('#tablaProductos tbody').on('click', 'tr', function () {
        const row = tabla.row(this);
        mostrarDetalles(productos[row.index()])
      });
  }

  // Llama a la función para llenar la tabla cuando el DOM esté completamente cargado
  llenarTabla();
  
});
