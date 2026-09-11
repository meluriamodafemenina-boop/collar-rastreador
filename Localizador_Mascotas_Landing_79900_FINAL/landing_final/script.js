const PRICE = 79900;
const WA_NUMBER = "573147636825";

// ===============================
// GALERÍA DE IMÁGENES
// ===============================

const galleryImages = document.querySelectorAll(".gallery img");
const mainImage = document.getElementById("mainImage");

if (galleryImages.length && mainImage) {
  galleryImages.forEach(img => {
    img.addEventListener("click", () => {
      mainImage.src = img.src;
    });
  });
}


// ===============================
// WHATSAPP
// ===============================

const whatsappButtons = document.querySelectorAll("[data-whatsapp]");

whatsappButtons.forEach(button => {
  button.addEventListener("click", () => {
    const message = encodeURIComponent(
      "Hola, estoy interesado en el Localizador para Mascotas AirTag Pet."
    );

    window.open(
      `https://wa.me/${WA_NUMBER}?text=${message}`,
      "_blank"
    );
  });
});


// ===============================
// MODAL DE PEDIDO
// ===============================

const orderModal = document.getElementById("orderModal");
const openOrderButtons = document.querySelectorAll("[data-open-order]");
const closeOrderButton = document.getElementById("closeOrder");

function openOrderModal() {
  if (orderModal) {
    orderModal.classList.add("active");
  }
}

function closeOrderModal() {
  if (orderModal) {
    orderModal.classList.remove("active");
  }
}

openOrderButtons.forEach(button => {
  button.addEventListener("click", openOrderModal);
});

if (closeOrderButton) {
  closeOrderButton.addEventListener("click", closeOrderModal);
}

if (orderModal) {
  orderModal.addEventListener("click", e => {
    if (e.target === orderModal) {
      closeOrderModal();
    }
  });
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

      // IMPORTANTE:
      // Se elimina .select() para evitar que el navegador
      // necesite permiso SELECT después de crear el pedido.

      const { data: pedido, error } =
        await window.supabaseClient
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

      console.log("PEDIDO REGISTRADO:", pedido);

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
