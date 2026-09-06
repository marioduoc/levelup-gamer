const USUARIOS_KEY = "levelup_usuarios";

function obtenerUsuarios() {
  const data = localStorage.getItem(USUARIOS_KEY);
  return data ? JSON.parse(data) : [];
}

function guardarUsuarios(usuarios) {
  localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
}

function registrarUsuario(usuario) {
  const usuarios = obtenerUsuarios();

  if (usuarios.some(u => u.run === usuario.run)) {
    return { ok: false, error: "Ya existe un usuario registrado con ese RUN." };
  }
  if (usuarios.some(u => u.correo.toLowerCase() === usuario.correo.toLowerCase())) {
    return { ok: false, error: "Ya existe un usuario registrado con ese correo." };
  }

  usuarios.push(usuario);
  guardarUsuarios(usuarios);
  return { ok: true };
}

function eliminarUsuario(run) {
  const usuarios = obtenerUsuarios().filter(u => u.run !== run);
  guardarUsuarios(usuarios);
}

function actualizarUsuario(run, datosNuevos) {
  const usuarios = obtenerUsuarios();
  const index = usuarios.findIndex(u => u.run === run);
  if (index === -1) return { ok: false, error: "Usuario no encontrado." };
  usuarios[index] = { ...usuarios[index], ...datosNuevos };
  guardarUsuarios(usuarios);
  return { ok: true };
}
