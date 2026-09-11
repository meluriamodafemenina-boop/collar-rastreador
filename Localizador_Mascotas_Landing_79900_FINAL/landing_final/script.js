const PRICE = 79900;
const WA_NUMBER = "573147636825";

// ===============================
// GALERÍA DE IMÁGENES
// ===============================

const mainPhoto = document.getElementById("mainPhoto");
const thumbnails = document.querySelectorAll(".thumb");

thumbnails.forEach(thumb => {
  thumb.addEventListener("click", () => {
    const src = thumb.dataset.src;

    if (mainPhoto && src) {
      mainPhoto.src = src;
    }

    thumbnails.forEach(item => {
      item.classList.remove("active");
    });

    thumb.classList.add("active");
  });
});


// ===============================
// GALERÍA AMPLIADA / LIGHTBOX
// ===============================

const openGallery = document.getElementById("openGallery");
const lightbox = document.getElementById("lightbox");
const zoomPhoto = document.getElementById("zoomPhoto");
const closeGallery = document.getElementById("closeGallery");

if (openGallery && lightbox && zoomPhoto && mainPhoto) {
  openGallery.addEventListener("click", () => {
    zoomPhoto.src = mainPhoto.src;
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
  });
}

function closeLightbox() {
  if (lightbox) {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
  }
}

if (closeGallery) {
  closeGallery.addEventListener("click", closeLightbox);
}

if (lightbox) {
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}


// ===============================
// WHATSAPP
// ===============================

const waTop = document.getElementById("waTop");

if (waTop) {
  const message = encodeURIComponent(
    "Hola, estoy interesado en el Localizador para Mascotas AirTag Pet."
  );

  waTop.href = `https://wa.me/${WA_NUMBER}?text=${message}`;
}


// ===============================
// MODAL DE PEDIDO
// ===============================

const orderModal = document.getElementById("orderModal");
const openOrderButtons = document.querySelectorAll(".order-trigger");
const closeOrderButton = document.getElementById("closeOrder");
const orderOverlay = document.getElementById("orderOverlay");

function openOrderModal(e) {
  if (e) {
    e.preventDefault();
  }

  if (orderModal) {
    orderModal.classList.add("active");
    orderModal.setAttribute("aria-hidden", "false");
  }
}

function closeOrderModal() {
  if (orderModal) {
    orderModal.classList.remove("active");
    orderModal.setAttribute("aria-hidden", "true");
  }
}

openOrderButtons.forEach(button => {
  button.addEventListener("click", openOrderModal);
});

if (closeOrderButton) {
  closeOrderButton.addEventListener("click", closeOrderModal);
}

if (orderOverlay) {
  orderOverlay.addEventListener("click", closeOrderModal);
}


// ===============================
// FORMULARIO DE PEDIDO
// ===============================

const form = document.getElementById("orderForm");
const msg = document.getElementById("formMessage");

if (form) {
  form.addEventListener("submit", async e => {
    e.preventDefault();

    if (msg) {
      msg.textContent = "Registrando pedido...";
    }

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
      total: PRICE * cantidad,
      observaciones: observaciones,
      estado: "Pendiente"
    };

    console.log("DATOS ENVIADOS A SUPABASE:", data);

    try {
      const { error } = await window.supabaseClient
        .from(window.SUPABASE_TABLE)
        .insert([data]);

      if (error) {
        console.error("ERROR DE SUPABASE:", error);

        if (msg) {
          msg.innerHTML = `
            <strong>⚠️ ERROR DE SUPABASE</strong>
            <br><br>
            ${error.message}
            <br><br>
            <small>
              Código: ${error.code || "No disponible"}
            </small>
          `;
        }

        return;
      }

      console.log("PEDIDO REGISTRADO CORRECTAMENTE");

      if (msg) {
        msg.textContent =
          "¡Pedido registrado correctamente! Te contactaremos para confirmar. 🐾";
      }

      form.reset();

      setTimeout(() => {
        closeOrderModal();

        if (msg) {
          msg.textContent = "";
        }
      }, 2200);

    } catch (err) {
      console.error("ERROR COMPLETO:", err);

      if (msg) {
        msg.innerHTML = `
          <strong>⚠️ ERROR</strong>
          <br><br>
          ${err.message || err}
        `;
      }
    }
  });
}
