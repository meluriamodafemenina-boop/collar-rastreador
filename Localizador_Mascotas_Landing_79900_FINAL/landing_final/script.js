const PRICE = 79900;
const WA_NUMBER = "573147636825";

const mainPhoto = document.getElementById("mainPhoto");
const thumbs = [...document.querySelectorAll(".thumb")];

thumbs.forEach(t => {
  t.addEventListener("click", () => {
    thumbs.forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    mainPhoto.src = t.dataset.src;
  });
});

const lightbox = document.getElementById("lightbox");
const zoomPhoto = document.getElementById("zoomPhoto");

document.getElementById("openGallery").addEventListener("click", () => {
  zoomPhoto.src = mainPhoto.src;
  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");
});

document.getElementById("closeGallery").addEventListener("click", closeLightbox);

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

function closeLightbox() {
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
}

const waText = encodeURIComponent(
  "Hola, estoy interesado(a) en el Localizador para Mascotas de $79.900. Quiero hacer un pedido."
);

document.getElementById("waTop").href =
  `https://wa.me/${WA_NUMBER}?text=${waText}`;

const form = document.getElementById("orderForm");
const msg = document.getElementById("formMessage");

form.addEventListener("submit", async e => {
  e.preventDefault();

  msg.textContent = "Registrando pedido...";

  const raw = Object.fromEntries(new FormData(form).entries());

  const nombre = (raw.nombre || "").trim();
  const telefono = (raw.telefono || "").trim();
  const ciudad = (raw.ciudad || "").trim();
  const barrio = (raw.barrio || "").trim();
  const direccion = (raw.direccion || "").trim();
  const cantidad = Number(raw.cantidad || 1);
  const observaciones = (raw.observaciones || "").trim();

  const data = {
    nombre: nombre,
    telefono: telefono,
    ciudad: ciudad,
    direccion: direccion,
    barrio: barrio,
    producto: "Localizador para Mascotas",
    cantidad: cantidad,
    precio_unitario: PRICE,
    total: PRICE * cantidad,
    observaciones: observaciones,
    estado: "Pendiente"
  };

  try {
    const { data: insertedData, error } =
      await window.supabaseClient
        .from(window.SUPABASE_TABLE)
        .insert([data])
        .select();

    if (error) {
      console.error("Error de Supabase:", error);
      throw error;
    }

    console.log("Pedido registrado:", insertedData);

    msg.textContent =
      "¡Pedido registrado correctamente! Te contactaremos para confirmar. 🐾";

    form.reset();

  } catch (err) {
    console.error("No se pudo registrar el pedido:", err);

    msg.textContent =
      "No pudimos registrar el pedido. Puedes pedirlo directamente por WhatsApp.";
  }
});
