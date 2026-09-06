const regiones = [
  {
    nombre: "Arica y Parinacota",
    comunas: ["Arica", "Camarones", "Putre", "General Lagos"]
  },
  {
    nombre: "Tarapacá",
    comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Pica"]
  },
  {
    nombre: "Antofagasta",
    comunas: ["Antofagasta", "Calama", "Tocopilla", "Mejillones", "San Pedro de Atacama"]
  },
  {
    nombre: "Atacama",
    comunas: ["Copiapó", "Vallenar", "Caldera", "Chañaral"]
  },
  {
    nombre: "Coquimbo",
    comunas: ["La Serena", "Coquimbo", "Ovalle", "Illapel", "Vicuña"]
  },
  {
    nombre: "Valparaíso",
    comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "San Antonio", "Los Andes", "Quillota"]
  },
  {
    nombre: "Región Metropolitana de Santiago",
    comunas: ["Santiago", "Providencia", "Las Condes", "Ñuñoa", "Maipú", "Puente Alto", "La Florida", "San Bernardo", "Melipilla"]
  },
  {
    nombre: "Libertador General Bernardo O'Higgins",
    comunas: ["Rancagua", "San Fernando", "Rengo", "Santa Cruz"]
  },
  {
    nombre: "Maule",
    comunas: ["Talca", "Curicó", "Linares", "Constitución"]
  },
  {
    nombre: "Ñuble",
    comunas: ["Chillán", "Chillán Viejo", "San Carlos", "Bulnes"]
  },
  {
    nombre: "Biobío",
    comunas: ["Concepción", "Talcahuano", "Los Ángeles", "Chiguayante", "Coronel"]
  },
  {
    nombre: "La Araucanía",
    comunas: ["Temuco", "Villarrica", "Angol", "Pucón"]
  },
  {
    nombre: "Los Ríos",
    comunas: ["Valdivia", "La Unión", "Río Bueno", "Panguipulli"]
  },
  {
    nombre: "Los Lagos",
    comunas: ["Puerto Montt", "Osorno", "Castro", "Puerto Varas", "Ancud"]
  },
  {
    nombre: "Aysén del General Carlos Ibáñez del Campo",
    comunas: ["Coyhaique", "Puerto Aysén", "Chile Chico"]
  },
  {
    nombre: "Magallanes y de la Antártica Chilena",
    comunas: ["Punta Arenas", "Puerto Natales", "Porvenir"]
  }
];

function inicializarSelectorRegiones(selectRegionId = "region", selectComunaId = "comuna") {
  const selectRegion = document.getElementById(selectRegionId);
  const selectComuna = document.getElementById(selectComunaId);
  if (!selectRegion || !selectComuna) return;

  selectRegion.innerHTML = '<option value="">Selecciona una región</option>' +
    regiones.map(r => `<option value="${r.nombre}">${r.nombre}</option>`).join("");

  selectRegion.addEventListener("change", () => {
    const region = regiones.find(r => r.nombre === selectRegion.value);
    selectComuna.innerHTML = region
      ? '<option value="">Selecciona una comuna</option>' + region.comunas.map(c => `<option value="${c}">${c}</option>`).join("")
      : '<option value="">Primero selecciona una región</option>';
  });
}
