const CARRITO_KEY = "levelup_carrito";

function obtenerCarrito() {
  const data = localStorage.getItem(CARRITO_KEY);
  return data ? JSON.parse(data) : [];
}

function guardarCarrito(carrito) {
  localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
  actualizarContadorCarrito();
}

function agregarAlCarrito(codigo) {
  const producto = obtenerProductos().find(p => p.codigo === codigo);
  if (!producto) return;

  const carrito = obtenerCarrito();
  const itemExistente = carrito.find(item => item.codigo === codigo);
  const cantidadEnCarrito = itemExistente ? itemExistente.cantidad : 0;

  if (cantidadEnCarrito + 1 > producto.stock) {
    alert(`Solo quedan ${producto.stock} unidades disponibles de "${producto.nombre}".`);
    return;
  }

  if (itemExistente) {
    itemExistente.cantidad += 1;
  } else {
    carrito.push({ codigo: producto.codigo, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
  }

  guardarCarrito(carrito);
}

function eliminarDelCarrito(codigo) {
  const carrito = obtenerCarrito().filter(item => item.codigo !== codigo);
  guardarCarrito(carrito);
}

function cambiarCantidad(codigo, nuevaCantidad) {
  const carrito = obtenerCarrito();
  const item = carrito.find(i => i.codigo === codigo);
  if (!item) return;

  if (nuevaCantidad <= 0) {
    eliminarDelCarrito(codigo);
    return;
  }
  item.cantidad = nuevaCantidad;
  guardarCarrito(carrito);
}

function calcularTotalCarrito(carrito) {
  return carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
}

function actualizarContadorCarrito() {
  const contador = document.getElementById("cart-count");
  if (!contador) return;
  const carrito = obtenerCarrito();
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  contador.textContent = totalItems;
}

function badgeStock(producto) {
  if (producto.stock <= 0) return `<span class="stock-badge stock-agotado">Agotado</span>`;
  if (producto.stock <= (producto.stockCritico ?? 0)) return `<span class="stock-badge stock-critico">¡Últimas unidades!</span>`;
  return "";
}

function renderizarProductos(lista, contenedorId = "product-grid") {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  contenedor.innerHTML = lista.map(producto => `
    <article class="product-card">
      <a href="producto-detalle.html?codigo=${producto.codigo}" class="product-link">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
      </a>
      ${badgeStock(producto)}
      <p class="price">${formatearPrecio(producto.precio)}</p>
      <button class="btn btn-primary" data-codigo="${producto.codigo}" ${producto.stock <= 0 ? "disabled" : ""}>
        ${producto.stock <= 0 ? "Sin stock" : "Añadir al carrito"}
      </button>
    </article>
  `).join("");

  contenedor.querySelectorAll("button[data-codigo]:not([disabled])").forEach(boton => {
    boton.addEventListener("click", () => agregarAlCarrito(boton.dataset.codigo));
  });
}

function renderizarDetalleProducto(contenedorId = "product-detail") {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  const params = new URLSearchParams(window.location.search);
  const codigo = params.get("codigo");
  const producto = obtenerProductos().find(p => p.codigo === codigo);

  if (!producto) {
    contenedor.innerHTML = `<p>Producto no encontrado. <a href="productos.html">Volver al catálogo</a>.</p>`;
    return;
  }

  contenedor.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}" class="detail-img">
    <div class="detail-info">
      <span class="detail-category">${producto.categoria}</span>
      <h1>${producto.nombre}</h1>
      <p class="price">${formatearPrecio(producto.precio)}</p>
      ${badgeStock(producto)}
      <p class="detail-desc">${producto.descripcion}</p>
      <button class="btn btn-primary" data-codigo="${producto.codigo}" ${producto.stock <= 0 ? "disabled" : ""}>
        ${producto.stock <= 0 ? "Sin stock" : "Añadir al carrito"}
      </button>
    </div>
  `;

  const boton = contenedor.querySelector("button[data-codigo]");
  if (boton && !boton.disabled) {
    boton.addEventListener("click", () => agregarAlCarrito(producto.codigo));
  }
}

function renderizarCarrito(contenedorId = "cart-container") {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  const carrito = obtenerCarrito();

  if (carrito.length === 0) {
    contenedor.innerHTML = `<p class="cart-empty">Tu carrito está vacío. <a href="productos.html">Ver catálogo</a>.</p>`;
    return;
  }

  const filas = carrito.map(item => `
    <tr>
      <td>${item.nombre}</td>
      <td>${formatearPrecio(item.precio)}</td>
      <td>
        <div class="qty-control">
          <button type="button" class="qty-btn" data-codigo="${item.codigo}" data-delta="-1">−</button>
          <span>${item.cantidad}</span>
          <button type="button" class="qty-btn" data-codigo="${item.codigo}" data-delta="1">+</button>
        </div>
      </td>
      <td>${formatearPrecio(item.precio * item.cantidad)}</td>
      <td><button type="button" class="btn-remove" data-codigo="${item.codigo}" aria-label="Eliminar">✕</button></td>
    </tr>
  `).join("");

  const total = calcularTotalCarrito(carrito);

  contenedor.innerHTML = `
    <table class="cart-table">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>${filas}</tbody>
    </table>
    <div class="cart-summary">
      <p>Total: <span class="price">${formatearPrecio(total)}</span></p>
      <button type="button" class="btn btn-primary" id="btn-pagar">Proceder al pago</button>
    </div>
  `;

  contenedor.querySelectorAll(".qty-btn").forEach(boton => {
    boton.addEventListener("click", () => {
      const codigo = boton.dataset.codigo;
      const delta = parseInt(boton.dataset.delta, 10);
      const item = obtenerCarrito().find(i => i.codigo === codigo);
      if (item) cambiarCantidad(codigo, item.cantidad + delta);
      renderizarCarrito(contenedorId);
    });
  });

  contenedor.querySelectorAll(".btn-remove").forEach(boton => {
    boton.addEventListener("click", () => {
      eliminarDelCarrito(boton.dataset.codigo);
      renderizarCarrito(contenedorId);
    });
  });

  const btnPagar = document.getElementById("btn-pagar");
  if (btnPagar) {
    btnPagar.addEventListener("click", () => {
      alert("¡Gracias por tu compra!");
      guardarCarrito([]);
      renderizarCarrito(contenedorId);
    });
  }
}

function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO + "T00:00:00");
  return fecha.toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
}

function renderizarBlog(contenedorId = "blog-grid") {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  contenedor.innerHTML = articulosBlog.map(articulo => `
    <a href="blog-detalle.html?id=${articulo.id}" class="blog-card">
      <span class="blog-category">${articulo.categoria}</span>
      <h3>${articulo.titulo}</h3>
      <p>${articulo.resumen}</p>
      <span class="blog-date">${formatearFecha(articulo.fecha)}</span>
    </a>
  `).join("");
}

function renderizarDetalleBlog(contenedorId = "blog-detail") {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const articulo = articulosBlog.find(a => a.id === id);

  if (!articulo) {
    contenedor.innerHTML = `<p>Artículo no encontrado. <a href="blogs.html">Volver al blog</a>.</p>`;
    return;
  }

  contenedor.innerHTML = `
    <span class="detail-category">${articulo.categoria}</span>
    <h1>${articulo.titulo}</h1>
    <span class="blog-date">${formatearFecha(articulo.fecha)}</span>
    <p class="blog-body">${articulo.contenido}</p>
  `;
}

// Actualiza el año del footer al año actual (evita tener que editarlo a mano)
function actualizarAnioFooter() {
  const anioActual = new Date().getFullYear();
  document.querySelectorAll(".copyright").forEach((el) => {
    el.textContent = el.textContent.replace(/\b\d{4}\b/, anioActual);
  });
}

document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);
document.addEventListener("DOMContentLoaded", actualizarAnioFooter);
window.addEventListener("pageshow", actualizarContadorCarrito);
window.addEventListener("storage", (evento) => {
  if (evento.key === CARRITO_KEY) actualizarContadorCarrito();
});
