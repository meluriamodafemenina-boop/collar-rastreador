const PRICE = 79900;
const WA_NUMBER = "573147636825";

// ===============================
// GALERÍA
// ===============================

const mainPhoto = document.getElementById("mainPhoto");
const thumbs = [...document.querySelectorAll(".thumb")];

thumbs.forEach(t => {
  t.addEventListener("click", () => {
    thumbs.forEach(x => x.classList.remove("active"));
    t.classList.add("active");
    mainPhoto.src = t.dataset.src;
thumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    thumbs.forEach((item) => item.classList.remove("active"));
    thumb.classList.add("active");
    mainPhoto.src = thumb.dataset.src;
  });
});

const lightbox = document.getElementById("lightbox");
const zoomPhoto = document.getElementById("zoomPhoto");
const openGallery = document.getElementById("openGallery");
const closeGallery = document.getElementById("closeGallery");

if (openGallery) {
  openGallery.addEventListener("click", () => {
    zoomPhoto.src = mainPhoto.src;
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
  });
}

document.getElementById("openGallery").addEventListener("click", () => {
  zoomPhoto.src = mainPhoto.src;
  lightbox.classList.add("show");
  lightbox.setAttribute("aria-hidden", "false");
});

document.getElementById("closeGallery").addEventListener(
  "click",
  closeLightbox
);
if (closeGallery) {
  closeGallery.addEventListener("click", closeLightbox);
}

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});
if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

function closeLightbox() {
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
}


// ===============================
// WHATSAPP
// ===============================

const waText = encodeURIComponent(
  "Hola, estoy interesado(a) en el Localizador para Mascotas de $79.900. Quiero hacer un pedido."
  "Hola, estoy interesado(a) en el Localizador para Mascotas AirTag Pet de $79.900. Quiero hacer un pedido."
);

document.getElementById("waTop").href =
  `https://wa.me/${WA_NUMBER}?text=${waText}`;
const waTop = document.getElementById("waTop");

if (waTop) {
  waTop.href = `https://wa.me/${WA_NUMBER}?text=${waText}`;
}

// ===============================
// FORMULARIO
// VENTANA DEL FORMULARIO
// ===============================

const form = document.getElementById("orderForm");
const msg = document.getElementById("formMessage");
const orderModal = document.getElementById("orderModal");
const orderOverlay = document.getElementById("orderOverlay");
const closeOrder = document.getElementById("closeOrder");

form.addEventListener("submit", async e => {
const orderButtons = document.querySelectorAll(".order-trigger");

  e.preventDefault();
function openOrderModal() {
  if (!orderModal) return;

  msg.textContent = "Registrando pedido...";
  orderModal.classList.add("show");
  orderModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeOrderModal() {
  if (!orderModal) return;

  const raw = Object.fromEntries(
    new FormData(form).entries()
  );
  orderModal.classList.remove("show");
  orderModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

  const nombre = (raw.nombre || "").trim();
  const telefono = (raw.telefono || "").trim();
  const ciudad = (raw.ciudad || "").trim();
  const barrio = (raw.barrio || "").trim();
  const direccion = (raw.direccion || "").trim();
  const cantidad = Number(raw.cantidad || 1);
  const observaciones = (raw.observaciones || "").trim();
orderButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    openOrderModal();
  });
});

  const data = {
    nombre: nombre,
    telefono: telefono,
    ciudad: ciudad,
    direccion: direccion,
    barrio: barrio,
    producto: "Localizador para Mascotas",
    cantidad: cantidad,
    precio_unitario: PRICE,
    observaciones: observaciones,
    estado: "Pendiente"
  };
if (closeOrder) {
  closeOrder.addEventListener("click", closeOrderModal);
}

  console.log("DATOS ENVIADOS A SUPABASE:", data);
if (orderOverlay) {
  orderOverlay.addEventListener("click", closeOrderModal);
}

  try {
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeOrderModal();
  }
});

    const { error } = await window.supabaseClient
      .from(window.SUPABASE_TABLE)
      .insert([data]);
// ===============================
// FORMULARIO
// ===============================

    if (error) {
const form = document.getElementById("orderForm");
const msg = document.getElementById("formMessage");

      console.error("ERROR DE SUPABASE:", error);
if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    msg.textContent = "Registrando pedido...";

    const raw = Object.fromEntries(
      new FormData(form).entries()
    );

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
      producto: "Localizador para Mascotas AirTag Pet",
      cantidad: cantidad,
      precio_unitario: PRICE,
      observaciones: observaciones,
      estado: "Pendiente"
    };

    console.log("DATOS ENVIADOS A SUPABASE:", data);

    try {
      const { data: pedido, error } =
        await window.supabaseClient
          .from(window.SUPABASE_TABLE)
          .insert([data])
          .select();

      if (error) {
        console.error("ERROR DE SUPABASE:", error);

        msg.innerHTML = `
          <strong>⚠️ ERROR DE SUPABASE</strong>
          <br><br>
          ${error.message}
          <br><br>
          <small>
            Código: ${error.code || "No disponible"}
          </small>
        `;

        return;
      }

      console.log("PEDIDO REGISTRADO:", pedido);

      msg.textContent =
        "¡Pedido registrado correctamente! Te contactaremos para confirmar. 🐾";

      form.reset();

      setTimeout(() => {
        closeOrderModal();
        msg.textContent = "";
      }, 2200);

    } catch (error) {
      console.error("ERROR COMPLETO:", error);

      msg.innerHTML = `
        <strong>⚠️ ERROR DE SUPABASE</strong><br><br>
        ${error.message}<br><br>
        <small>Código: ${error.code || "No disponible"}</small>
        <strong>⚠️ ERROR</strong>
        <br><br>
        ${error.message || error}
      `;

      return;
    }

    console.log("PEDIDO REGISTRADO CORRECTAMENTE");

    msg.textContent =
      "¡Pedido registrado correctamente! Te contactaremos para confirmar. 🐾";

    form.reset();

  } catch (err) {

    console.error("ERROR COMPLETO:", err);

    msg.innerHTML = `
      <strong>⚠️ ERROR</strong><br><br>
      ${err.message || err}
    `;
  }

});
  });
}
