const ADMIN_CREDENCIALES = { correo: "admin@gmail.com", password: "admin" };
const ADMIN_SESION_KEY = "levelup_admin_sesion";

function iniciarSesionAdmin(correo, password) {
  if (correo === ADMIN_CREDENCIALES.correo && password === ADMIN_CREDENCIALES.password) {
    sessionStorage.setItem(ADMIN_SESION_KEY, "activa");
    return true;
  }
  return false;
}

function haySesionAdminActiva() {
  return sessionStorage.getItem(ADMIN_SESION_KEY) === "activa";
}

function cerrarSesionAdmin() {
  sessionStorage.removeItem(ADMIN_SESION_KEY);
  window.location.href = "login.html";
}

function protegerPaginaAdmin() {
  if (!haySesionAdminActiva()) {
    window.location.href = "login.html";
  }
}
