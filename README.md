# Level-Up Gamer

Tienda gamer chilena (sin local físico, despacho a todo el país). Sitio web
frontend desarrollado con **HTML, CSS y JavaScript** puros, sin frameworks.

Proyecto de la asignatura **DSY1104 — Evaluación Parcial 1**.

## Integrantes
- Mario Araus
- Christian Ponce

## Cómo abrir el sitio
No requiere servidor ni instalación. Basta con abrir `index.html` en el navegador
(doble clic, o clic derecho → abrir con...). Para navegar todo el flujo se
recomienda usar un navegador actualizado (Chrome, Firefox o Edge).

> Si al abrir la tienda no cargan bien los productos, el navegador pudo cachear
> una versión anterior en LocalStorage: abrir en ventana de incógnito, o borrar
> los datos del sitio (F12 → Application → Local Storage).

## Estructura
```
levelup-gamer/
├── index.html            Home
├── productos.html        Catálogo
├── producto-detalle.html Detalle de producto
├── carrito.html          Carrito de compras
├── registro.html         Registro de usuario
├── login.html            Inicio de sesión
├── nosotros.html         Quiénes somos
├── blogs.html            Blog
├── blog-detalle.html     Detalle de artículo
├── contacto.html         Formulario de contacto
├── css/style.css         Hoja de estilos (identidad de marca)
├── js/                   Lógica y validaciones
│   ├── main.js           Navegación / utilidades
│   ├── products.js       Catálogo y detalle
│   ├── validaciones.js   Validación de formularios
│   ├── regiones.js       Región/Comuna dependientes
│   ├── usuarios.js       Registro / sesión de usuarios
│   └── blog.js           Blog
├── img/                  Imágenes de productos
└── admin/                Módulo administrador
```

## Módulo administrador
Acceso en `admin/login.html`:
- **Correo:** `admin@gmail.com`
- **Contraseña:** `admin`

## Identidad de marca
- **Colores:** fondo negro `#000000`, azul eléctrico `#1E90FF`, verde neón
  `#39FF14`, texto blanco `#FFFFFF` y gris claro `#D3D3D3`.
- **Tipografías:** Orbitron (títulos) y Roboto (texto).

## Categorías
Juegos de Mesa, Accesorios, Consolas, Computadores Gamers, Sillas Gamers, Mouse,
Mousepad, Poleras/Polerones personalizados y Servicio Técnico.
