document.addEventListener("DOMContentLoaded", function () {
  const catalogo = document.getElementById("catalogo");
  // Ejemplo de datos de productos (puedes cargar estos datos desde un archivo JSON)
  const productos = [
    {
      nombre: "Producto 1",
      imagen: "./static/img/colcha-individual.png",
      precio: "$100",
    },
    {
      nombre: "Producto 2",
      imagen: "./static/img/colcha-matrimonial.png",
      precio: "$150",
    },
    // Agrega más productos según sea necesario
  ];

  // Rellena el catálogo con los productos utilizando la función de creación
  /* productos.forEach((producto) => {
    const productoDiv = crearProducto(producto, () =>
      mostrarDetalles(producto)
    );
    catalogo.appendChild(productoDiv);
  }); */

  // Obtener todos los enlaces de subcategoría
  const enlacesSubcategoria = document.querySelectorAll(".dropdown-item");

  // Agregar manejador de eventos a cada enlace
  enlacesSubcategoria.forEach((enlace) => {
    enlace.addEventListener("click", function (event) {
      event.preventDefault();
      const categoria = this.getAttribute("data-categoria");
      cargarIframe(categoria);
      llenarTabla(productos);
    });
  });

  const homeBtn = document.getElementById('goHome')

  homeBtn.addEventListener("click", function(e){
    cargarCarrusel(productos);
  })


  cargarCarrusel(productos);
});

// Función para crear la estructura de un producto
function crearProducto(producto, clicCallback) {
  const productoDiv = document.createElement("div");
  productoDiv.classList.add("producto");

  const imagen = document.createElement("img");
  imagen.src = producto.imagen;
  imagen.alt = producto.nombre;

  const nombre = document.createElement("h2");
  nombre.textContent = producto.nombre;

  const precio = document.createElement("p");
  precio.textContent = "Precio: " + producto.precio;

  productoDiv.appendChild(imagen);
  productoDiv.appendChild(nombre);
  productoDiv.appendChild(precio);

  // Agrega la funcionalidad de clic utilizando la función proporcionada
  productoDiv.addEventListener("click", clicCallback);

  return productoDiv;
}

// Función de clic para mostrar detalles (puedes personalizar esto)
function mostrarDetalles(producto) {
  alert("Detalles de " + producto.nombre + ": Precio " + producto.precio);
}

function insertarHtmlEnCatalogo(html) {
  const catalogo = document.getElementById("catalogo");
  const divTemporal = document.createElement("div");
  divTemporal.innerHTML = html;

  // Insertar todos los nodos hijos del div temporal en el catálogo
  while (divTemporal.firstChild) {
    catalogo.appendChild(divTemporal.firstChild);
  }
}

// Función para cargar dinámicamente el contenido de una categoría
function cargarCategoria(categoria) {
  // Construye la ruta completa al archivo local.
  const filePath = `./html/categories/${categoria}.html`;

  // Usa fetch con el modo 'no-cors' para evitar problemas CORS en local.
  fetch(filePath)
    .then((response) => response.text())
    .then((html) => {
      // Almacena el contenido en sessionStorage.
      sessionStorage.setItem("plantillaCategoria", html);
      console.log("Plantilla descargada y almacenada localmente:", html);

      // Ahora puedes usar el contenido como prefieras.
      insertarHtmlEnCatalogo(html);
    })
    .catch((error) => console.error("Error al cargar el contenido:", error));
}

function cargarIframe(categoria) {
  const iframe = document.createElement("iframe");
  iframe.src = `./html/categories/${categoria}.html`;
  iframe.width = "100%";
  iframe.height = "600px";

  // Eliminar cualquier contenido existente en el catálogo
  catalogo.innerHTML = "";
  catalogo.appendChild(iframe);
}

// Función para cargar el carrusel
function cargarCarrusel(productos) {
  // Eliminar cualquier contenido existente en el catálogo
  catalogo.innerHTML = "";

  // Crear el carrusel
  const carrusel = document.createElement("div");
  carrusel.id = "carruselProductos";
  carrusel.classList.add("carousel", "slide");
  carrusel.setAttribute("data-ride", "carousel");

  // Crear indicadores
  const indicadores = document.createElement("ul");
  indicadores.id = "indicadores";
  indicadores.classList.add("carousel-indicators");

  // Crear carruselInner
  const carruselInner = document.createElement("div");
  carruselInner.id = "carruselInner";
  carruselInner.classList.add("carousel-inner");

  // Agregar indicadores al carrusel
  carrusel.appendChild(indicadores);

  // Agregar carruselInner al carrusel
  carrusel.appendChild(carruselInner);

  // Agregar carrusel al catálogo
  catalogo.appendChild(carrusel);

  // Añadir productos al carruselInner
  productos.forEach((producto, index) => {
    const item = document.createElement("div");
    item.classList.add("carousel-item");
    if (index === 0) {
      item.classList.add("active");
    }

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;

    // Agregar imagen al item del carrusel
    item.appendChild(imagen);

    // Agregar item al carruselInner
    carruselInner.appendChild(item);

    // Crear indicador
    const indicador = document.createElement("li");
    indicador.setAttribute("data-target", "#carruselProductos");
    indicador.setAttribute("data-slide-to", index.toString());
    if (index === 0) {
      indicador.classList.add("active");
    }

    // Agregar indicador a la lista de indicadores
    indicadores.appendChild(indicador);
  });
}

// Función para rellenar la tabla con los productos
function llenarTabla(productos) {
  const tabla = $('#tablaProductos tbody');
  tabla.empty(); // Limpiar la tabla antes de rellenar

  productos.forEach(producto => {
    const fila = `<tr>
                    <td><img src="${producto.imagen}" alt="${producto.nombre}"></td>
                    <td>${producto.nombre}</td>
                    <td>${producto.precio}</td>
                  </tr>`;
    tabla.append(fila);
  });

  // Inicializar DataTables
  $('#tablaProductos').DataTable();
}