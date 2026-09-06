const DOMINIOS_CORREO_VALIDOS = ["duoc.cl", "profesor.duoc.cl", "gmail.com"];

function validarCorreo(correo) {
  const partes = correo.split("@");
  if (partes.length !== 2) return false;
  const dominio = partes[1].toLowerCase();
  return DOMINIOS_CORREO_VALIDOS.includes(dominio) && correo.length <= 100;
}

function validarRun(run) {
  const limpio = run.trim().toUpperCase();
  if (!/^[0-9]{6,8}[0-9K]$/.test(limpio)) return false;
  if (limpio.length < 7 || limpio.length > 9) return false;

  const cuerpo = limpio.slice(0, -1);
  const dv = limpio.slice(-1);

  let suma = 0;
  let multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }
  const resto = 11 - (suma % 11);
  const dvEsperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);

  return dv === dvEsperado;
}

function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  const nacimiento = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}

function mostrarError(input, mensaje) {
  const grupo = input.closest(".form-group");
  if (!grupo) return;
  grupo.classList.add("invalid");
  const errorSpan = grupo.querySelector(".error-msg");
  if (errorSpan) errorSpan.textContent = mensaje;
}

function limpiarError(input) {
  const grupo = input.closest(".form-group");
  if (!grupo) return;
  grupo.classList.remove("invalid");
}
